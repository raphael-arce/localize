import React, {Component} from "react";
import {Navbar, FormControl, Nav, Container, Row, Col} from "react-bootstrap";
import {Auth} from "../../constants/Authentication";
import './Home.css'
import {Redirect} from "react-router-dom";
import Dashboard from "../../components/Dashboard";
import Products from "../../components/Products";
import Integrations from "../../components/Integrations";
import Settings from "../../components/Settings";
import Orders from "../../components/Orders";


export default class Home extends Component{

    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            selectedKey: 'Dashboard'
        }
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect(key) {
        this.setState({selectedKey: key})
    }

    renderSelectedKey() {
        switch(this.state.selectedKey) {
            case 'Dashboard':
                return <Dashboard/>;
            case 'Products':
                return <Products/>;
            case 'Orders':
                return <Orders/>;
            case 'Integrations':
                return <Integrations/>;
            case 'Settings':
                return <Settings/>;
            default:
                return null;
        }
    }

    render() {
        const{redirect} = this.state;
        if(redirect)
            return <Redirect to="/login"/>


        return (
            <>

                <Navbar bg="dark" variant="dark">
                    <Row className='w-100'>
                        <Col xs='auto'>
                            <Navbar.Brand>Inventory API</Navbar.Brand>
                        </Col>
                        <Col>
                            <FormControl className="form-control form-control-dark w-100" aria-describedby="basic-search" placeholder='Search' />
                        </Col>
                        <Col xs='auto'>
                            <Nav className='w-100'>
                                <Nav.Link href="#" onClick={() => { Auth.logout( (error = null) => {
                                    if(error)
                                        console.log(error)
                                    else
                                        this.setState({redirect: true})
                                })}}>Logout</Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                </Navbar>
                <Container fluid={true} >
                    <Row>
                        <Col sm='auto'>
                            <Navbar variant='light' className='sideNav'>
                                <Nav defaultActiveKey='Dashboard' className='flex-column align-self-start' onSelect={k => this.handleSelect(k)}>
                                    <Nav.Link eventKey='Dashboard'>
                                        <i className='fa fa-home fa-fw'/> &nbsp; Dashboard
                                    </Nav.Link>
                                    <Nav.Link eventKey='Products'>
                                        <i className='fa fa-shopping-cart fa-fw'/> &nbsp; Products
                                    </Nav.Link>
                                    <Nav.Link eventKey='Orders'>
                                        <i className='fa fa-bell fa-fw'/> &nbsp; Orders
                                    </Nav.Link>
                                    <Nav.Link eventKey='Integrations'>
                                        <i className='fa fa-plus-square fa-fw'/> &nbsp; Integrations
                                    </Nav.Link>
                                    <Nav.Link eventKey='Settings'>
                                        <i className='fa fa-cogs fa-fw'/> &nbsp; Settings
                                    </Nav.Link>
                                </Nav>
                            </Navbar>
                        </Col>
                        <Col>
                            {this.renderSelectedKey()}
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
