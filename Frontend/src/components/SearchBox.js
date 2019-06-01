import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button";

import Suggestions from './Suggestions';
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const API_URL = 'http://localhost:8000/localize'

class SearchBox extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.search = this.search.bind(this)
    }

    search() {
        let req = `${API_URL}?`
        let query = this.props.state.query
        if(typeof query === "string" && query.length > 0 && query.includes(' ')) {
            query = query.split(' ')
            req += `keywords=[${query}]`
        } else {
            req += `keywords=["${query}"]`
        }

        if(this.props.state.location) {
            req += `&location=${this.props.state.location}`
        }
        console.log('searching for', req)
        fetch(req)
            .then(response => response.json())
            .then( response => {
                this.props.setState("results", response, () => {})
            })
            .catch(error => console.log(error))
    }

    handleInputChange(e) {
      this.props.setState(e.target.name, e.target.value)
    };

    componentDidMount() {
        let shouldSearch = (this.props.state.results.length === 0 && typeof this.props.state.query === 'string' && this.props.state.query.length > 0) || (this.props.state.results.length === 0 && typeof  this.props.state.location === 'string' && this.props.state.location.length > 0)
        if(shouldSearch) {
            this.search()
        }
    }

    handleKeyDown(e) {
        //alert("key pressed: " + e.key)
        if (e.key === 'Enter' && (this.props.state.query || this.props.state.location)) {
            //alert("pressed enter with value: " + this.props.state.query)
            this.search()
        }

    };

    render() {
        return (
            <>
                <Row>
                    <Col md={6}>
                        <InputGroup>
                            <FormControl
                                placeholder="Search for ..."
                                name='query'
                                value={this.props.state.query}
                                onChange={this.handleInputChange}
                                onKeyDown={this.handleKeyDown}
                            />

                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title={'Category'}
                            >
                                <Dropdown.Item>Category 1</Dropdown.Item>
                                <Dropdown.Item>Category 2</Dropdown.Item>
                                <Dropdown.Item>Category 3</Dropdown.Item>
                                <Dropdown.Item>Category 4</Dropdown.Item>
                            </DropdownButton>

                        </InputGroup>
                        <Suggestions setState={this.props.setState} state={this.props.state}/>
                    </Col>
                    <Col md={4}>
                        <InputGroup>
                            <FormControl
                                placeholder="Postcode/Place"
                                name='location'
                                value={this.props.state.location}
                                onChange={this.handleInputChange}
                                onKeyDown={this.handleKeyDown}
                            />
                            <DropdownButton
                                as={InputGroup.Append}
                                variant="outline-secondary"
                                title={'Distance'}
                            >
                                <Dropdown.Item>+ 0km</Dropdown.Item>
                                <Dropdown.Item>+ 5km</Dropdown.Item>
                                <Dropdown.Item>+ 10km </Dropdown.Item>
                                <Dropdown.Item>+ 20km</Dropdown.Item>
                                <Dropdown.Item>+ 30km</Dropdown.Item>
                                <Dropdown.Item>+ 50km</Dropdown.Item>
                                <Dropdown.Item>+ 100km</Dropdown.Item>
                                <Dropdown.Item>+ 150km</Dropdown.Item>
                                <Dropdown.Item>+ 200km</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>
                    </Col>
                    <Col md={2}>
                        <Button variant="outline-secondary" onClick={() => this.search()}>
                            <i className="fas fa-search"></i>
                            &nbsp;
                            Search
                        </Button>
                    </Col>
                </Row>
            </>
      )
    }
}

export default SearchBox
