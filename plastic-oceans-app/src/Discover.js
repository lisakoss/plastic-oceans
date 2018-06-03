import React from 'react';
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

const wrapperStyles = {
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
}

export default class Discover extends React.Component {
  constructor() {
    super()
    this.state = {
      center: [-122.4821475, 47.6129432],
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
            for (let item of currentItemsMap) {
              let newItemLength = `${item[0]} x${item[1]}`.length;
              if(itemLength < newItemLength) {
                itemLength = newItemLength;
              }
              itemString += `${item[0]} x${item[1]} <br/>`
            }

            let debrisObj = { 
              markerOffset: -25,
              name: itemString,
              coordinates: [debris.Longitude, debris.Latitude],
              id: count
            }

            mapMarkers.push(debrisObj);
            itemLengths.push(itemLength);
            count++;
            currentItemsMap = new Map();
          }
        }

        this.setState({ markers: mapMarkers });
        this.setState( {markerLength: itemLengths });
      })
  }

  handleCityClick(city) {
    this.setState({
      center: city.coordinates,
    })
  }

  render() {
    let markersForMap = [];
    markersForMap = this.state.markers.map((marker, i) => (
      <Marker
        className={"popup"}
        key={i}
        marker={marker}
        width="50"
        style={{
          default: { fill: "#FF5722" },
          hover: { fill: "#FFFFFF" },
          pressed: { fill: "#FF5722" },
          width: "50"
        }}
      >
        <circle
          cx={0}
          cy={0}
          r={10}
          style={{
            stroke: "#FF5722",
            strokeWidth: 3,
            opacity: 0.9,
          }}
          data-tip={marker.name}
          data-event='click'
        />
      </Marker>
    ));


    console.log("map markers", markersForMap);
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
                          data-tip={geography.properties.name}
                          data-event='click'
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
              <ReactTooltip html={true} globalEventOff='click' />
            </div>
          )}
        </Motion>

      </div>
    )
  }
}
