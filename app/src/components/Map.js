import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Polygon } from 'react-google-maps';

class Map extends Component {

  render() {
    const mapContainer = <div style={{height: '100%', witdh: '100%'}}></div>

    const markers = this.props.markers.map((mark, i) => {

      const marker = {
        position: {
          lat: mark.lat,
          lng: mark.lng,
          title: mark.name
        }
      };

      return <Marker key={i} {...marker} />;
    });

    const polygons = this.props.polygons.map((poly, i) => {
      const polygon = {
        paths: poly.points,
        strokeColor: '#FF00FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      };

      return <Polygon key={i} {...polygon} />;
    });

    return (
      <GoogleMapLoader
        containerElement = { mapContainer }
        googleMapElement = {
          <GoogleMap
            defaultZoom = {14}
            defaultCenter = {this.props.center}
            mapTypeId = 'satellite'
            options = {{streetViewControl: false, mapTypeControl: false}}>
            { markers }
            { polygons }
          </GoogleMap>
        } />
    )
  }
}

export default Map;
