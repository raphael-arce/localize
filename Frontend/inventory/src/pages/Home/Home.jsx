import React, {Component} from "react";
import {Navbar, FormControl, Nav} from "react-bootstrap";
import {Auth} from "../../constants/Authentication";
import './Home.css'
import {Redirect} from "react-router-dom";


export default class Home extends Component{

    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    render() {
        const{redirect} = this.state;
        if(redirect)
            return <Redirect to="/login"/>


        return (
            <>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Inventory</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='w-100'>
                            <FormControl className="form-control form-control-dark w-100" aria-describedby="basic-search" placeholder='Search' />

                            <Nav.Link href="#" onClick={() => { Auth.logout( (error = null) => {
                                if(error)
                                    console.log(error)
                                else
                                    this.setState({redirect: true})
                            })}}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}
