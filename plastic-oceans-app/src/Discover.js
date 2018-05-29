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
      zoom: 3,
      markers: [
        { name: "Caracas", coordinates: [-66.9036, 10.4806] },
      ],
    }

    this.handleCityClick = this.handleCityClick.bind(this)
    this.handleReset = this.handleReset.bind(this)
    this.handleZoomIn = this.handleZoomIn.bind(this)
    this.handleZoomOut = this.handleZoomOut.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild()
    }, 100)
  }

  componentWillMount() {
    // fetch the non-profits
    let mapMarkers = [];
    fetch('https://raw.githubusercontent.com/lisakoss/plastic-oceans/a18311262874ff12e5fc9abd8bd6bb51d0f285be/plastic-oceans-app/src/DiscoverMapData.json')
      .then(res => res.json())
      .then(parsedRes => {
        //console.log("parsedRes", parsedRes);
        let previousCoords = [];
        let currentItems = [];
        for (let debris of parsedRes) {
          //console.log("debris", debris)
          // if coords match
          console.log("previos", previousCoords[0] == debris.Longitude && previousCoords[1] == debris.Latitude);
          if (previousCoords[0] == debris.Longitude && previousCoords[1] == debris.Latitude) {
            currentItems.push(debris.ItemName);
          } else { // else coords don't match, create marker
            currentItems.push(debris.ItemName);
            previousCoords = [debris.Longitude, debris.Latitude];

            let debrisObj = {
              markerOffset: -25,
              name: currentItems,
              coordinates: [debris.Longitude, debris.Latitude],
            }
            mapMarkers.push(debrisObj);
            currentItems = [];
          }
        }

        this.setState({ markers: mapMarkers });
      })
  }

  handleZoomIn() {
    this.setState({
      zoom: this.state.zoom * 2,
    })
  }
  handleZoomOut() {
    this.setState({
      zoom: this.state.zoom / 2,
    })
  }

  handleCityClick(city) {
    this.setState({
      center: city.coordinates,
    })
  }

  handleReset() {
    this.setState({
      center: [0, 1],
      zoom: 3,
    })
  }

  render() {
    console.log("the state", this.state.markers);
    let markersForMap = [];

    markersForMap = this.state.markers.map((marker, i) => (
      <Marker
        key={i}
        marker={marker}
        onClick={this.handleCityClick}
        style={{
          default: { fill: "#FF5722" },
          hover: { fill: "#FFFFFF" },
          pressed: { fill: "#FF5722" },
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
        />
        <text
          textAnchor="middle"
          y={marker.markerOffset}
          style={{
            fontFamily: "Roboto, sans-serif",
            fill: "#607D8B",
          }}
        >
          {marker.name}
        </text>
      </Marker>
    ))


    console.log("map markers", markersForMap);
    return (
      <div style={wrapperStyles}>
        <button onClick={this.handleZoomIn}>
          {"Zoom in"}
        </button>
        <button onClick={this.handleZoomOut}>
          {"Zoom out"}
        </button>
        <button onClick={this.handleReset}>
          {"Reset"}
        </button>
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
              <ReactTooltip />
            </div>
          )}
        </Motion>
      </div>
    )
  }
}
