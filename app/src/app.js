import React, { Component } from "react";
import './style.css';
import ReactDOM from "react-dom";
import Map from './components/Map.js'
import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDmMO2AxP6wHhq2nIDg9pZzfe5TEV60oVQ",
  authDomain: "react-maps-dbc72.firebaseapp.com",
  databaseURL: "https://react-maps-dbc72.firebaseio.com",
  projectId: "react-maps-dbc72",
  storageBucket: "",
  messagingSenderId: "890133682496"
};

export default class App extends Component {

  constructor() {
    super();

    this.app = firebase.initializeApp(config);
    this.markersData = this.app.database().ref().child('markers');
    this.polygonsData = this.app.database().ref().child('polygons');

    this.state ={
      markers: [],
      polygons: [],
      location: {
        lat: -34.014623,
        lng: -60.434949
      }
    };

  }

  componentDidMount() {
    const previousMarkers = this.state.markers;

    this.markersData.on('child_added', snap => {

      previousMarkers.push({
        id: snap.key,
        lat: snap.val().lat,
        lng: snap.val().lng,
        name: snap.val().name
      })

      this.setState({
        markers: previousMarkers
      })

    });

    const previousPolygons = this.state.polygons;

    this.polygonsData.on('child_added', snap => {

      previousPolygons.push({
        id: snap.key,
        points: snap.val().points,
        name: snap.val().name
      })

      this.setState({
        polygons: previousPolygons
      })

    });

  }

  render() {

    return(
      <div style={{width: '100%', height: '100vh'}}>
        <Map center={this.state.location} markers={this.state.markers} polygons={this.state.polygons}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
