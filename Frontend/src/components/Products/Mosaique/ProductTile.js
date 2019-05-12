import React, {Component} from 'react'
import Card from "react-bootstrap/Card";

class ProductTile extends Component {

    render() {
        return <>
            <Card style={{width:'9rem'}}>
                <Card.Img variant="top" src="placeholder.png" />
                <Card.Body>
                    <Card.Title> {this.props.details.productName} </Card.Title>
                    <Card.Subtitle> {this.props.details.price} </Card.Subtitle>
                </Card.Body>
            </Card>
        </>
    }
}

export default ProductTile
