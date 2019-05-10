import React, { Component } from 'react'
import Search from "./Search";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


class Root extends Component {
    constructor(props) {
        super(props)
        this.setStateCB = this.setStateCB.bind(this)
    }

    setStateCB(name, value, cb = null) {
        this.setState({[name]: value}, () => {
            if(typeof cb == 'function') {
                cb();
            }
        })
    }

    render() {
        return (
            <>
                <Container>
                    <Row style={{marginTop: "20%"}}>
                        <Col align={"center"}>
                            <img
                                width={295}
                                height={128}
                                src="logo.png"
                                alt="Placeholder"
                            />
                        </Col>
                    </Row>
                    <Row style={{marginTop: "2%"}}>
                        <Col align={"center"}>
                            <Search setState={this.setStateCB} state={this.state}/>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default Root
