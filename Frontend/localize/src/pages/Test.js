import React, {Component} from 'react'
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col"
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from "leaflet";


const polyline = [[51.505, -0.09], [51.51, -0.1], [51.51, -0.12]]

export default class Test extends Component {

    constructor(props) {
        super(props)
        this.state = {
            center: [51.505,0.09],
            zoom: 13
        }
    }



    render() {
        return <div style={{height: '100%', background: '#32dd44'}}>
            <Container className='d-flex flex-column' style={{height: '100%', background:'rgb(208,148,142)'}}>
                <Row style={{background: '#999232'}}>
                    <Col style={{background: '#845555'}}>
                        <Map style={{height: 200, width: 200}} center={this.state.center} zoom={this.state.zoom}>
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Popup position={this.state.center} closeButton={false}>
                                EUR 165
                            </Popup>
                        </Map>
                    </Col>
                </Row>
                <Row className="m-2">
                    <div className='marker'>
                        <span className='marker-font'>&nbsp; EUR 165 &nbsp;</span>
                        <div className='diamond'/>
                    </div>
                </Row>
            </Container>
        </div>
    }

}
