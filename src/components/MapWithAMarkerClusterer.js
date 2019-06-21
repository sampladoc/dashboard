import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
const { compose, withProps, withHandlers } = require("recompose");
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer");

const MapWithAMarkerClusterer = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCsCoo6ZeIPRJJetL10Pmtrlrv__OPC8iI&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `580px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withHandlers({
        onMarkerClustererClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers()
            console.log(`Current clicked markers length: ${clickedMarkers.length}`)
            console.log(clickedMarkers)
        },
    }),
    withScriptjs,
    withGoogleMap
)(props =>

    <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: 41.958534, lng: -91.774823 }}
    >
        <MarkerClusterer
            onClick={props.onMarkerClustererClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.markers.map((marker, index) => (
                parseInt(marker.latitude._text, 10) > 0 && (
                    //console.log(parseInt(marker.latitude._text, 10) / 1000000,parseInt(marker.longitude._text, 10) / 1000000),
                    <Marker
                        key={index}
                        position={{ lat: parseInt(marker.latitude._text, 10) / 1000000, lng: parseInt(marker.longitude._text, 10) / 1000000 }}
                    />
                )
            ))}
        </MarkerClusterer>
    </GoogleMap>
);

export default MapWithAMarkerClusterer;