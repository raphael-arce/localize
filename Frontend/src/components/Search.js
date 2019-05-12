import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button";

import Suggestions from './Suggestions';

const API_URL = 'http://localhost:8000/localize'

class Search extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.search = this.search.bind(this)
    }

    search() {
        let req = `${API_URL}?keywords=["${this.props.state.query}"]`
        console.log(req)
        fetch(req)
            .then(response => response.json())
            .then( response => {
                this.props.setState("results", response, () => console.log(this.props.state.results))
            })
            .catch(error => console.log(error))
    }

    handleInputChange(e) {
      this.props.setState("query", e.target.value)
    };

    componentDidMount() {
        if(this.props.state.results.length === 0 && typeof this.props.state.query === 'string' && this.props.state.query.length > 0 ) {
            this.search()
        }
    }

    handleKeyDown(e) {
        //alert("key pressed: " + e.key)
        if (e.key === 'Enter' && this.props.state.query) {
            //alert("pressed enter with value: " + this.props.state.query)
            this.search()
        }

    };

    render() {
        return (
            <>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search for ..."
                        value={this.props.state.query}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleKeyDown}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" onClick={() => this.search()}>Search</Button>
                    </InputGroup.Append>
                </InputGroup>
                <Suggestions setState={this.props.setState} state={this.props.state}/>
            </>
      )
    }
}

export default Search
