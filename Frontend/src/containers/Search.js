import React, { Component } from 'react'

import axios from 'axios'


//import Suggestions from '../components/Suggestions';

const API_URL = 'http://localhost:3000/products'

class Search extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  state = {
    query: '',
    results: []
    
  }

  /*getAllInfo = () => {
    axios.get(`${API_URL}`)
      .then(({ data }) => {
        this.setState({
          results: data
        })
      })
  }*/

  getInfo = () => {
    axios.get(`${API_URL}?keywords=["${this.state.query}"]`)
      .then(({ data }) => {
        this.setState({
          results: data
        })
      })
  }

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
          this.getInfo()
      } else if (!this.state.query) {
        //this.getAllInfo()
      }
    })
  }

  render() {
    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <div ref={this.myRef} />;
      </form>
    )
  }
}


export default Search