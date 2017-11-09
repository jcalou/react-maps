import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, Polygon, InfoWindow } from 'react-google-maps';

class Map extends Component {

  constructor(props) {
    super(props);

    this.state ={
      showingInfoWindow: false,
      windowPosition: null,
      windowContent: null
    };

    this.openInfoWindow = this.openInfoWindow.bind(this);
    this.closeInfoWindow = this.closeInfoWindow.bind(this);
    this.infoWindow = this.infoWindow.bind(this);
  }

  closeInfoWindow() {

    this.setState({
      showingInfoWindow: false
    })

  }

  openInfoWindow(loc, data) {

    let markerLoc = {
      lat: loc.latLng.lat(),
      lng: loc.latLng.lng()
    }

    this.setState({
      showingInfoWindow: true,
      windowPosition: markerLoc,
      windowContent: data.name
    })

  }

  infoWindow() {
    if(this.state.showingInfoWindow) {
      return (
        <InfoWindow
        position={this.state.windowPosition}
        onCloseclick={this.closeInfoWindow}
        zIndex={100}
        content={ this.state.windowContent }
        options={{visible: this.state.showingInfoWindow}} />
      )
    }else{
      return
    }
  }

  componentWillMount() {
    this.infoWindow();
  }

  render() {
    const mapContainer = <div style={{height: '100%', witdh: '100%'}}></div>

    const markers = this.props.markers.map((mark, i) => {

      const marker = {
        position: {
          lat: mark.lat,
          lng: mark.lng,
          title: mark.name
        },
        title: mark.name
      };

      return <Marker key={i} {...marker} />;
    });

    const polygons = this.props.polygons.map((poly, i) => {

      return  (<Polygon key={i} options={{
                    paths: poly.points,
                    strokeColor: poly.color,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: poly.color,
                    fillOpacity: 0.35
                  }} onClick={(info) => {this.openInfoWindow(info,poly)}} />
              )
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
            { this.infoWindow() }
          </GoogleMap>
        } />
    )
  }
}

export default Map;
