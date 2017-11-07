import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Map from './components/Map.js'
import Places from './components/Places.js'
import superagent from 'superagent'

class App extends Component {

  constructor() {
    super()
    this.state ={
      venues: []
    }
  }

  componentDidMount() {
    console.log('ComponentDidMount');
    const url = 'https://api.foursquare.com/v2/venues/search?v=20140806&ll=40.7575285,-73.9884469&client_id=VZZ1EUDOT0JYITGFDKVVMCLYHB3NURAYK3OHB5SK5N453NFD&client_secret=UAA15MIFIWVKZQRH22KPSYVWREIF2EMMH0GQ0ZKIQZC322NZ'

    superagent
    .get(url)
    .query(null)
    .set('Accept', 'text/json')
    .end((error, response) => {

      const venues = response.body.response.venues
      //console.log(JSON.stringify(venues))

      this.setState({
        venues: venues
      })

    })

  }

  render() {
    const location = {
      lat: 40.7575285,
      lng: -73.9884469
    }

    const markers = [
      {
        location: {
          lat: 40.7575285,
          lng: -73.9884469
        }
      }
    ]

    return (
      <div>
        <div style={{width: '30%', height: 600}}>
          <Map center={location} markers={this.state.venues} />
        </div>

        <div style={{width: '70%', height: 600}}>
          <Places venues={this.state.venues}/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
