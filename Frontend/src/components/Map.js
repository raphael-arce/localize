import React, {Component} from 'react'
import { Map, TileLayer, Popup } from 'react-leaflet'




class MyMap extends Component {

    constructor(props) {
        super(props)

        this.state = {
            center: [52.5065133,13.1445598],
            zoom: 13
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.updateCenter = this.updateCenter.bind(this)
    }

    componentDidMount() {
        this.updateCenter()
    }

    componentDidUpdate(prevProps) {
        if(this.props.results !== prevProps.results) {
            this.updateCenter()
        }
    }

    updateCenter() {
        if(typeof this.props.results[0] !== 'undefined') {
            this.setState({center: this.props.results[0].shopGeo})
        }
    }

    render() {
        return (
            <>
                <Map style={{height:"100%"}} center={this.state.center} zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.props.results.map(shop => {
                        let lowestPrice = Number.MAX_VALUE
                        shop.inventory.forEach(product => {
                            let price = product.price.replace('EUR ','').replace(',','.')
                            if(price < lowestPrice) {
                                lowestPrice = price
                            }
                        })
                        return <Popup key={shop._id}
                                      position={shop.shopGeo}
                                      closeButton={false}
                                      autoClose={false}
                                      closeOnEscapeKey={false}
                                      closeOnClick={false}
                                >
                            {'EUR ' + lowestPrice.toString().replace('.', ',')}
                            </Popup>
                    })}
                </Map>
            </>
        )
    }
}

export default MyMap
