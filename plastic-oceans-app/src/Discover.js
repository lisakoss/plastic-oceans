import React from 'react';
import {findDOMNode} from 'react-dom'
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
import ReactTooltip from "react-tooltip";
import $ from "jquery";
import { Button } from 'reactstrap';

import NavigationBar from './NavigationBar'

const wrapperStyles = {
  width: "100%",
  margin: "0 auto",
}

export default class Discover extends React.Component {
  constructor() {
    super()
    this.state = {
      center: [-98.58, 39.83],
      zoom: 6,
      markers: [
        { name: "Caracas", coordinates: [-66.9036, 10.4806] },
      ],
    }

    this.handleCityClick = this.handleCityClick.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)
  }

  componentDidUpdate() {
    ReactTooltip.rebuild()
  }

  componentWillMount() {
    ReactTooltip.rebuild()
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
              name: `${numOfItemsCollected} pieces of trash have been collected:<br/> ${itemString}`,
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

  handleCityClick(city) {
    this.setState({
      center: city.coordinates,
    })
  }

  render() {
    const tooltipStyle = {
      pointerEvents: 'auto', // enable click/selection etc. events inside tooltip
      overflowY: 'auto', // make content scrollable,
      ...this.props.style // apply style overrides
    }
    let content = ReactDOMServer.renderToString((<Button style={tooltipStyle}>CLOSE</Button>));
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
          id={i}
          className={this.state.popup}
          ref='foo'
          data-html="true"
          data-tip={`${marker.name} ${content}`}
          data-event={"click"}
        >
          {marker.numOfItemsCollected}
        </text>
      </Marker>
    ));

    $(".__react_component_tooltip").click(() => {
      ReactTooltip.hide(findDOMNode(this.refs.foo));
    });

    return (
      <div style={wrapperStyles}>
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
                width={980}
                height={551}
                style={{
                  width: "100%",
                  height: "auto",
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
                              fill: "#FF5722",
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
              <ReactTooltip style={tooltipStyle} globalEventOff="click"  />
            </div>
          )}
        </Motion>
      </div>
    )
  }
}
