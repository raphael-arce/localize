import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {Auth} from "../constants/Authentication";
import {FormErrors} from "../constants/FormErrors";


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirmation: '',
            formErrors: {email: '', password: '', 'password confirmation': ''},
            emailValid: false,
            passwordValid: false,
            passwordConfirmationValid: false,
            formValid: false,
            serverMessage: '',
            serverMessageVariant: 'danger',
            status: ''
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
        let passwordConfirmationValid = this.state.passwordConfirmationValid;
        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 2;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
            case 'passwordConfirmation':
                passwordConfirmationValid = (value === this.state.password);
                fieldValidationErrors['password confirmation'] = passwordConfirmationValid ? '' : ' does not match';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid,
            passwordConfirmationValid: passwordConfirmationValid,
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid && this.state.passwordConfirmationValid });
    }

    handleSubmit(event) {
        if (this.state.formValid) {

            Auth.register(this.state.email, this.state.password, (err) => {
                if (err)
                    this.setState({
                        serverMessage: err,
                        serverMessageVariant: 'danger'
                    });
                else
                    this.setState({
                        email: '',
                        password: '',
                        passwordConfirmation: '',
                        formErrors: {email: '', password: '', 'password confirmation': ''},
                        emailValid: false,
                        passwordValid: false,
                        passwordConfirmationValid: false,
                        formValid: false,
                        serverMessage: 'Success!',
                        serverMessageVariant: 'success'
                    })
            });

            event.preventDefault();
        }
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }

    render () {

        return (
            <div>
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                        <Row className="justify-content-md-center">
                            {this.state.serverMessage ? <Alert variant={this.state.serverMessageVariant} >{this.state.serverMessage}</Alert> : <div/>}
                        </Row>
                        <Row className="justify-content-md-center">
                            <FormErrors formErrors={this.state.formErrors}/>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col>
                                <Form.Group controlId="formRegisterEmail" className={this.errorClass(this.state.formErrors.email)}>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control onChange={this.handleChange} type="email" placeholder="Enter email" name="email" value={this.state.email}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col>
                                <Form.Group controlId="formRegisterPassword" className={this.errorClass(this.state.formErrors.password)}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={this.handleChange} type="password" placeholder="Password" name="password" value={this.state.password}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col>
                                <Form.Group controlId="formRegisterConfirmPassword" className={this.errorClass(this.state.formErrors['password confirmation'])}>
                                    <Form.Label>Confirm password</Form.Label>
                                    <Form.Control onChange={this.handleChange} type="password" placeholder="Confirm password" name="passwordConfirmation" value={this.state['password confirmation']}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Button variant="primary" type="submit"  disabled={!this.state.formValid || this.state.isLoading}>Register</Button>
                        </Row>
                    </Form>
                </Container>
            </div>
        )
    }
}
