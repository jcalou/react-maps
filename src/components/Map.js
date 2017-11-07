import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Polygon } from 'react-google-maps';

class Map extends Component {

  render() {
    const mapContainer = <div style={{height: '100%', witdh: '100%'}}></div>

    const markers = this.props.markers.map((venue, i) => {

      const marker = {
        position: {
          lat: venue.lat,
          lng: venue.lng,
        }
      };

      return <Marker key={i} {...marker} />;
    });

    const loteCuatroCoords = [
      {lat: -34.023049, lng: -60.446048},
      {lat: -34.025791, lng: -60.442461},
      {lat: -34.031170, lng: -60.448609},
      {lat: -34.028464, lng: -60.452188}
    ];

    return (
      <GoogleMapLoader
        containerElement = { mapContainer }
        googleMapElement = {
          <GoogleMap
            defaultZoom={14}
            defaultCenter={this.props.center}
            mapTypeId='satellite'
            options={{streetViewControl: false, mapTypeControl: false}}>
            { markers }
            <Polygon
              paths={ loteCuatroCoords }
              strokeColor='#FF00FF'
              strokeOpacity={0.8}
              strokeWeight={2}
              fillColor='#FF0000'
              fillOpacity={0.35}
            />
          </GoogleMap>
        } />
    )
  }
}

export default Map;
