import React, {Component} from 'react'
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

class ProductTile extends Component {

    render() {
        return <Col lg={4} sm={5}>
            <Container className='pb-3' style={{height: '100%', width: '100%'}}>
            <Card style={{height: '100%'}}>
                <Card.Img variant="top" src={this.props.details.imgUrl} />
                <Card.Body className='align-self-stretch'>
                    <Card.Subtitle> {this.props.details.productName} </Card.Subtitle>
                </Card.Body>
                <Card.Footer> {this.props.details.price} </Card.Footer>
            </Card>
            </Container>
        </Col>
    }
}

export default ProductTile
