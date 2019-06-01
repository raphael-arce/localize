import React, { Component } from 'react'
import {Form} from 'react-bootstrap'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

class RefineSearch extends Component {

    //TODO add functionality...

    render () {
        return <div>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Container>
                        <Row className="justify-content-center">
                            SEARCH OPTIONS
                        </Row>

                        <hr/>

                        <Row className="justify-content-center">
                                <Form.Label>Sort by</Form.Label>
                        </Row>
                        <Row className="justify-content-center">
                            <Col>
                            <Form.Control as="select">
                                <option>Alphabetical: A-Z</option>
                                <option>Alphabetical: Z-A</option>
                                <option>Price: lowest first</option>
                                <option>Price: highest first</option>
                                <option>Distance: nearest first</option>
                            </Form.Control>
                            </Col>
                        </Row>

                        <hr/>

                        <Row className="justify-content-center">
                            <Form.Label>Price range</Form.Label>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Control type="text" placeholder="MIN" />
                            </Col>
                            -
                            <Col>
                                <Form.Control type="text" placeholder="MAX" />
                            </Col>
                        </Row>

                        <hr/>

                        <Row>
                            <Col>
                                <Form.Check label="Only show if available"/>
                            </Col>
                        </Row>
                    </Container>
                </Form.Group>
        </div>
    }
}


export default RefineSearch
