//API KEY FOR GOOGLE MAPS: 'AIzaSyA3QdJU4tDb58Vvx46uIDEsJR-vcW8tF0w'
//GEOCODING API: 'AIzaSyA3QdJU4tDb58Vvx46uIDEsJR-vcW8tF0w'

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Geocode from "react-geocode";


const AnyReactComponent = ({ text }) => <div><img src={require("assets/img/icons/common/dropPin.png")} alt={text} width="50"/></div>;


Geocode.setApiKey('AIzaSyA3QdJU4tDb58Vvx46uIDEsJR-vcW8tF0w');
Geocode.setLanguage("es");
Geocode.setRegion("co");
Geocode.enableDebug();


class SimpleMap extends Component {

  static defaultProps = {
    center: {
      lat: 3.376804,
      lng:  -76.530432
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyA3QdJU4tDb58Vvx46uIDEsJR-vcW8tF0w' }}
          defaultCenter={{lat: this.props.state.latitude, lng: this.props.state.length}}
          defaultZoom={15}
        >
          <AnyReactComponent
            lat={this.props.state.latitude}
            lng={this.props.state.length}
            text="Tu casa"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
