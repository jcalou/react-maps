import React, { Component } from "react";
import './style.css';
import ReactDOM from "react-dom";
import Map from './components/Map.js'
import firebase from 'firebase';
import 'firebase/database';
import { config } from './config/config.js';

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
        lat: -34.024704,
        lng: -60.440991
      },
      user: null
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.renderLoginButton = this.renderLoginButton.bind(this);
  }

  componentWillMount() {

    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        user: user
      })
    });

  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(result))
      .catch(error => console.log(error))

  }

  handleLogout() {
    firebase.auth().signOut()
      .then(result => console.log('Cerro sesion'))
      .catch(error => console.log(error))
  }

  renderLoginButton() {
    if(this.state.user) {
      return (
        <div style={{width: '100%', height: '100vh'}}>
          <button onClick={this.handleLogout}>Logout</button>
          <Map center={this.state.location} markers={this.state.markers} polygons={this.state.polygons}/>
        </div>
      );
    }else {
      return (<button onClick={this.handleAuth}>Login con google</button>);
    }
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
        name: snap.val().name,
        color: snap.val().color
      })

      this.setState({
        polygons: previousPolygons
      })

    });

  }

  render() {

    return(
      <div>
        { this.renderLoginButton() }
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
