import React, { Component } from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from "react-bootstrap/es/FormControl";
import Button from "react-bootstrap/Button";

//import Suggestions from '../components/Suggestions';

const API_URL = 'http://localhost:3000/products'

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  getInfo = () => {
    fetch(`${API_URL}?keywords=["${this.state.query}"]`)
      .then(data => data.json())
      .then( response => this.props.setState({ results: response }))
  }

  handleInputChange = (e) => {
    this.props.setState({
      query: e.target.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
          this.getInfo()
      }
    })
  }

  render() {
    return (
        <InputGroup className="mb-3">
          <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              placeholder="Search for ..."
              onChange={this.handleInputChange}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary">Search</Button>
          </InputGroup.Append>
        </InputGroup>
    )
  }
}


export default Search
