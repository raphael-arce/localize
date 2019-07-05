import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
//import "../../constants/Authentication/Authentication"
import {Auth} from "../constants/Authentication";
import {FormErrors} from "../constants/FormErrors";


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false,
            redirectToReferrer: false,
            serverError: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value}, () => this.validateField(name, value));
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 2;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    handleSubmit(event) {
        if(this.state.formValid)
            Auth.login(this.state.email, this.state.password,(error) => {
                if(error)
                    this.setState({
                        serverError: "could not log in, try again",
                        error
                    }, () => console.log(this.state));

                else
                    this.setState(() => ({
                        email: '',
                        password: '',
                        formErrors: {email: '', password: ''},
                        emailValid: false,
                        passwordValid: false,
                        formValid: false,
                        redirectToReferrer: true,
                        serverError: ''
                    }))
            });

        event.preventDefault();
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    render () {

        const { from } = this.props.location.state || { from: { pathname: '/' } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }

        return (
            <div>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Row className="justify-content-md-center">
                            {this.state.serverError ? <Alert variant="danger" >{this.state.serverError}</Alert> : <div/>}
                        </Row>
                        <Row className="justify-content-md-center">
                            <FormErrors formErrors={this.state.formErrors}/>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col>
                                <Form.Group controlId="formLoginEmail" className={this.errorClass(this.state.formErrors.email)}>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control onChange={this.handleChange} type="email" placeholder="Enter email" name="email" value={this.state.email}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col>
                                <Form.Group controlId="formLoginPassword" className={this.errorClass(this.state.formErrors.password)}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={this.handleChange} type="password" placeholder="Password" name="password" value={this.state.password}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Button variant="primary" type="submit" disabled={!this.state.formValid}>Log in</Button>
                        </Row>
                    </Form>
                </Container>
            </div>
        )
    }
}
