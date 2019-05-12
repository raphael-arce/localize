import React, {Component} from 'react'
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

class ProductListItem extends Component {

    render() {
        return <div className='pb-3'>
            <Card style={{marginTop: '10px'}}>
                <Container>
                    <Row>
                        <Col md={'auto'} className='align-self-center'>
                            <Row className='justify-content-start'>
                                <img width={64} height={64} src={this.props.details.imgUrl} alt="Placeholder"/>
                            </Row>
                        </Col>
                        <Col md={'auto'} className='align-self-center'>
                            <h5>
                             {this.props.details.productName}
                            </h5>
                        </Col>
                        <Col className='align-self-center'>
                            <Row className='justify-content-end'>
                                {this.props.details.price} &nbsp;
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </Card>
        </div>
    }
}

export default ProductListItem
