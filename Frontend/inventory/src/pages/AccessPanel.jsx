import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Alert from "react-bootstrap/Alert";
import Login from "../components/Login";
import Register from "../components/Register";
import { Redirect } from "react-router-dom";
import {Auth} from "../constants/Authentication";

export default class AccessPanel extends Component {

    componentDidMount() {
        Auth.check(isLoggedIn => {
            this.setState({isLoggedIn: isLoggedIn})
        })
    }

    render () {

        const { from } =  { from: { pathname: '/' } };
        const { isLoggedIn } = this.state || false;

        if (isLoggedIn === true) {
            // eslint-disable-next-line react/jsx-no-undef
            return <Redirect to={from} />
        }


        return (
            <Container className="mt-5">
                <Row className="justify-content-md-center">
                    <Col xs={12} md={8}  lg={6}>
                        <Tab.Container id="left-tabs-example"  defaultActiveKey="login">
                            <Card>
                                <Card.Header>
                                    <Nav fill variant="tabs"  defaultActiveKey="login">
                                        <Nav.Item>
                                            <Nav.Link eventKey="login">Log in</Nav.Link>
                                        </Nav.Item>
                                        <Nav.Item>
                                            <Nav.Link eventKey="register">Register</Nav.Link>
                                        </Nav.Item>
                                    </Nav>
                                </Card.Header>
                                <Card.Body>
                                    <Container>
                                        <Tab.Content>
                                            <Tab.Pane eventKey="login">
                                                <Alert variant="danger">
                                                    <Alert.Heading>You are not logged in!</Alert.Heading>
                                                    <p>
                                                        Please log in or register to access this page.
                                                    </p>
                                                </Alert>
                                                <Login location={this.props.location}/>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="register">
                                                <Register location={this.props.location}/>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Container>
                                </Card.Body>
                            </Card>
                        </Tab.Container>
                    </Col>
                </Row>
            </Container>
        )
    }
}
