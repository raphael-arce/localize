import React, { Component } from 'react'
import Search from "../components/Search";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { withRouter } from "react-router-dom";


class Root extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            results: []
        }
        this.setStateCB = this.setStateCB.bind(this)
    }

    setStateCB(name, value, cb = null) {
        this.setState({[name]: value}, () => {
            if(typeof cb == 'function') {
                cb()
            }
            if(this.state.results.length > 0) {
                this.props.history.push({pathname: '/search', search: '?q=' + this.state.query, state: this.state })
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

export default withRouter(Root)
