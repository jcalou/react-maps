import React, { Component } from 'react';
import './App.css';
import Map from './components/Map.js';
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

class App extends Component {

  constructor() {
    super();

    this.app = firebase.initializeApp(config);
    this.database = this.app.database().ref().child('venues');

    this.state ={
      venues: []
    };

  }

  componentDidMount() {
    const previousVenues = this.state.venues;

    this.database.on('child_added', snap => {

      previousVenues.push({
        id: snap.key,
        lat: snap.val().lat,
        lng: snap.val().lng,
        name: snap.val().name
      })

      this.setState({
        venues: previousVenues
      })

    })

  }

  render() {
    const location = {
      lat: -34.014623,
      lng: -60.434949
    };

    return (
      <div style={{width: '100%', height: '100vh'}}>
        <Map center={location} markers={this.state.venues} />
      </div>
    )
  }
}

export default App;
