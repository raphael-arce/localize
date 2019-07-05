import React, { Component } from 'react'
import {withRouter} from "react-router-dom";
import SearchBox from "../components/SearchBox";
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
            myState.location = ''
        }
        else {
            const query = queryString.parse(this.props.location.search) // if you came from nowhere but added the query in the url
            if(typeof query.q !== 'undefined') {
                myState = {
                    query: query.q,
                    results: []
                }

            } else { // if you came from nowhere with no query in the url
                myState = {
                    query: '',
                    results: []
                }
            }
            if(typeof query.location !== 'undefined') { // if you came from nowhere but added the location in the url
                myState.location = query.location
            } else { // if you came from nowhere with no query in the url
                myState.location = ''
            }
        }
        this.state = myState
        this.setStateCB = this.setStateCB.bind(this)
    }

    setStateCB(name, value, cb = null) {
        this.setState({[name]: value}, () => {
            if(name === 'results') {
                let query = '?'
                if(this.state.query.length > 0) {
                    query += `q=${this.state.query}`
                }

                if(this.state.location.length > 0) {
                    if(this.state.query.length > 0)
                        query += '&'
                    query += `location=${this.state.location}`
                }
                this.props.history.push({pathname: '/search', search: query , state: this.state })
            }
            if(typeof cb == 'function') {
                cb();
            }
        })
    }



    render() {
        return <div className='full-available-height'>
            <Row className='align-items-center justify-content-center'>
                <Col md='auto'>
                    <img
                        width={148}
                        height={64}
                        src="logo.png"
                        alt="Placeholder"
                    />
                </Col>
                <Col md={8}>
                    <SearchBox setState={this.setStateCB} state={this.state}/>
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
                    <Col md={6} className='full-available-height'>
                        <Products results={this.state.results}/>
                    </Col>
                    <Col md={4} className='full-available-height'>
                        <MyMap results={this.state.results}/>
                    </Col>
            </Row>
        </div>
    }
}

export default withRouter(SearchPage)
