import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
 
import Search from './containers/Search';
import MapContainer from './containers/MapContainer';
import Suggestions from './components/Suggestions';
//import Map from './containers/Map';

class App extends Component {
  
  render() {
    return (
      <div className="main-container">
          <div className="nav-container">
            <nav className="nav">
              <div className="title">Localize</div>
            </nav>
            <div className="search">
              <Search/>
            </div>
          </div>
          <div className="map">
            <MapContainer/>
          </div>
          <div className="suggestions">
            <Suggestions ref={(input) => {this.results = input }}/>
          </div>
          
      </div>
    );
  }
}

export default App;
