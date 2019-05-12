import React, {Component} from 'react'
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

class ProductListItem extends Component {

    render() {
        return <>
            <Card style={{marginTop: '10px'}}>
                <Row>
                    <Col md={8} className='justify-content-start'>
                         {this.props.details.productName}
                    </Col>
                    <Col md={4} className='justify-content-end'>
                        {this.props.details.price}
                    </Col>
                </Row>
            </Card>
        </>
    }
}

export default ProductListItem
