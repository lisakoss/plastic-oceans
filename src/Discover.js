import React from 'react';
import { findDOMNode } from 'react-dom'
import ReactDOMServer from 'react-dom/server';
import './index.css';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker,
} from "react-simple-maps"
import { Motion, spring } from "react-motion"
import fetch from 'node-fetch';
import $ from "jquery";
import firebase from 'firebase';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import NavigationBar from './NavigationBar'

const wrapperStyles = {
  width: "100%",
  margin: "0 auto",
  height: "100%",
}

export default class Discover extends React.Component {
  constructor() {
    super()
    this.state = {
      center: [-122.33, 52.61],
      zoom: 6,
      markers: [
        { name: "Caracas", coordinates: [-66.9036, 10.4806] },
      ],
    }

    this.handleCityClick = this.handleCityClick.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.toggle = this.toggle.bind(this);
    this.closeBtn = this.closeBtn.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    $(window).on('resize', function () {
      this.location.href = this.location.href;
      window.location.reload();
    });
  }

  componentWillMount() {
    // Add a listener and callback for authentication events
    this.unregister = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid });
      }
      else {
        this.setState({ userId: null }); // null out the saved state if not logged in
        this.props.history.push('/signin'); // redirect to home page
      }
    });

    // fetch the trash collection sites
    let mapMarkers = [];
    let itemLengths = [];
    fetch('https://raw.githubusercontent.com/lisakoss/plastic-oceans/a18311262874ff12e5fc9abd8bd6bb51d0f285be/plastic-oceans-app/src/DiscoverMapData.json')
      .then(res => res.json())
      .then(parsedRes => {
        let previousCoords = [];
        let currentItems = new Map();
        let currentItemsMap = new Map();
        let count = 0;

        for (let debris of parsedRes) {
          // if coords match
          if (previousCoords[0] == debris.Longitude && previousCoords[1] == debris.Latitude) {
            let mapCount = currentItemsMap.get(debris.ItemName);
            if (mapCount === undefined) {
              currentItemsMap.set(debris.ItemName, 1);
            } else {
              mapCount++;
              currentItemsMap.set(debris.ItemName, mapCount)
            }
          } else { // else coords don't match, create marker
            previousCoords = [debris.Longitude, debris.Latitude];

            let itemString = "";
            let itemLength = 0;
            let numOfItemsCollected = 0;
            for (let item of currentItemsMap) {
              let newItemLength = `${item[0]} x${item[1]}`.length;
              if (itemLength < newItemLength) {
                itemLength = newItemLength;
              }
              itemString += `${item[0]} x${item[1]} <br/>`;
              numOfItemsCollected += item[1];
            }

            let debrisObj = {
              markerOffset: -25,
              name: <span dangerouslySetInnerHTML={{ __html: `${numOfItemsCollected} pieces of trash have been collected: <br/> ${itemString}` }}></span>,
              coordinates: [debris.Longitude, debris.Latitude],
              id: count,
              numOfItemsCollected: numOfItemsCollected,
            }

            mapMarkers.push(debrisObj);
            itemLengths.push(itemLength);
            count++;
            currentItemsMap = new Map();
          }
        }

        this.setState({ markers: mapMarkers });
        this.setState({ markerLength: itemLengths });
      })

  }

  // unregister saved funcs
  componentWillUnmount() {
    if (this.unregister) {
      this.unregister();
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleCityClick(city) {
    this.setState({
      center: city.coordinates,
    })
  }

  toggle(e) {
    this.setState({ [e.target.id]: !this.state[e.target.id] })
  }

  closeBtn(e) {
    let divId = "tooltip" + e.target.id;
    this.setState({ [divId]: false })
  }

  render() {
    const height = this.state.height;
    const width = this.state.width;
    const tooltipStyle = {
      pointerEvents: 'auto', // enable click/selection etc. events inside tooltip
      overflowY: 'auto', // make content scrollable,
      ...this.props.style // apply style overrides
    }
    let content = ReactDOMServer.renderToString((<Button style={tooltipStyle} onClick={this.closeBtn}>CLOSE</Button>));
    let markersForMap = [];

    markersForMap = this.state.markers.map((marker, i) => (
      <Marker
        className={"popup"}
        key={i}
        marker={marker}
        width="50"
        style={{
          default: { fill: "#14b7c5" },
          hover: { fill: "#8de3ea" },
          pressed: { fill: "#14b7c5" },
          width: "50"
        }}
      >
        <circle
          cx={0}
          cy={0}
          r={10}
          style={{
            stroke: "#14b7c5",
            strokeWidth: 3,
            opacity: 0.9,
          }}
        />
        <text
          y={6}
          x={-9}
          style={{
            fontFamily: "Roboto, sans-serif",
            fill: "#607D8B",
            transform: "scale(1, 1)",
          }}
          id={`tooltip${i}`}
          onClick={this.toggle}
        >
          {marker.numOfItemsCollected}
        </text>
      </Marker>
    ));

    // make the tooltips for each marker 
    let tooltipContent = [];
    let count = 0;
    for (let marker of this.state.markers) {
      let stateNum = `this.state.tooltip${String(count)}`
      let tooltip = (
        <div>
          <Popover isOpen={eval(stateNum) === undefined ? false : eval(stateNum)} toggle={this.toggle} placement="right" target={`tooltip${String(count)}`}>
            <PopoverBody>
              {marker.name}
              <Button onClick={this.closeBtn} id={String(count)}>CLOSE</Button>
            </PopoverBody>
          </Popover>
        </div>
      );
      tooltipContent.push(tooltip);
      count++;
    }

    return (
      <div style={wrapperStyles}>
        <NavigationBar title="Discover" selected="discover" />
        {tooltipContent}
        <Motion
          defaultStyle={{
            zoom: 1,
            x: 0,
            y: 20,
          }}
          style={{
            zoom: spring(this.state.zoom, { stiffness: 210, damping: 20 }),
            x: spring(this.state.center[0], { stiffness: 210, damping: 20 }),
            y: spring(this.state.center[1], { stiffness: 210, damping: 20 }),
          }}
        >
          {({ zoom, x, y }) => (
            <div>
              <ComposableMap
                projectionConfig={{ scale: 205 }}
                width={width}
                height={height}
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <ZoomableGroup center={[x, y]} zoom={zoom}>
                  <Geographies geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/examples/with-react-tooltip/static/world-50m.json">
                    {(geographies, projection) =>
                      geographies.map((geography, i) => geography.id !== "ATA" && (
                        <Geography
                          key={i}
                          geography={geography}
                          projection={projection}
                          style={{
                            default: {
                              fill: "#ECEFF1",
                              stroke: "#607D8B",
                              strokeWidth: 0.75,
                              outline: "none",
                            },
                            hover: {
                              fill: "#CFD8DC",
                              stroke: "#607D8B",
                              strokeWidth: 0.75,
                              outline: "none",
                            },
                            pressed: {
                              fill: "#8de3ea",
                              stroke: "#607D8B",
                              strokeWidth: 0.75,
                              outline: "none",
                            },
                          }}
                        />
                      ))}
                  </Geographies>
                  <Markers>
                    {markersForMap}
                  </Markers>
                </ZoomableGroup>
              </ComposableMap>
            </div>
          )}
        </Motion>
      </div>
    )
  }
}
