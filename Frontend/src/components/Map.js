import React, {Component} from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


class MyMap extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lat: 52.5159731,
            lng: 13.4679506,
            zoom: 13,
        }

    }

    render() {
        const position = [this.state.lat, this.state.lng]
        return (
            <>
                <Map style={{height:"100%"}} center={position} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </Map>
            </>
        )
    }
}

export default MyMap
