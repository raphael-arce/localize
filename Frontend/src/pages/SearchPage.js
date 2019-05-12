import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import Search from "../components/Search";
import queryString from 'query-string'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RefineSearch from "../components/RefineSearch"
import MyMap from "../components/Map"
import Products from "../components/Products/Products"
import Breadcrumb from 'react-bootstrap/Breadcrumb'


class SearchPage extends Component {

    constructor(props) {
        super(props)
        //console.log(this.props)
        let myState = {}
        if(typeof this.props.location.state !== 'undefined') { //if you came from root, location.state will be filled
            myState = this.props.location.state;
        }
        else {
            const query = queryString.parse(this.props.location.search).q //if you came from nowhere but added the query in the url
            if(typeof query !== 'undefined') {
                myState = {
                    query: query,
                    results: []
                }
            }
            else { //if you came from nowhere
                myState = {
                    query: '',
                    results: []
                }
            }
        }
        this.state = myState
        this.setStateCB = this.setStateCB.bind(this)
    }

    setStateCB(name, value, cb = null) {
        this.setState({[name]: value}, () => {
            if(name === 'query') {
                //TODO check if this might cause issues, when typing in the searchbar, should the URL be updated at the same time?
                this.props.history.push({pathname: '/search', search: '?q=' + this.state.query, state: this.state })
            }
            if(typeof cb == 'function') {
                cb();
            }
        })
    }

    render() {
        return <div className='full-available-height'>
            <Row>
                <Col md={{span: "auto", offset: 3}}>
                    <img
                        width={148}
                        height={64}
                        src="logo.png"
                        alt="Placeholder"
                    />
                </Col>
                <Col md={6} style={{marginTop: "2%"}}>
                    <Search setState={this.setStateCB} state={this.state}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Breadcrumb>
                        <Breadcrumb.Item href="#">Category</Breadcrumb.Item>
                        <Breadcrumb.Item href="#">
                            Subcategory
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>SubSubcategory</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row className='full-available-height'>
                    <Col md={2} className='full-available-height'>
                        <RefineSearch/>
                    </Col>
                    <Col md={5} className='full-available-height'>
                        <Products results={this.state.results}/>
                    </Col>
                    <Col md={5} className='full-available-height'>
                        <MyMap results={this.state.results}/>
                    </Col>
            </Row>
        </div>
    }
}

export default withRouter(SearchPage)
