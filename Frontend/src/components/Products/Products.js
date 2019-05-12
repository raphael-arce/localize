import React, { Component } from 'react'
import ProductMosaique from './Mosaique/ProductMosaique'
import ProductList from './List/ProductList'
import Pagination from "react-bootstrap/Pagination";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Products extends Component {

    constructor(props) {
        super(props)

        let active = 1;
        let items = [];
        for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active}>
                    {number}
                </Pagination.Item>,
            );
        }

        this.state = {
            value: 1,
            pages: items
        }

        this.handleChange = this.handleChange.bind(this)
        console.log('results in constructor of products: ')
        console.log(this.props.results)
    }

    handleChange(value, event) {
        this.setState({ value });
    }


    render () {
        return <div className='d-flex flex-column' style={{height: '100%'}}>

            <Row className='align-items-baseline'>
                <Col>
                    SEARCH RESULTS:
                </Col>
                <Col>
                    <Row className='justify-content-end'>
                    <ButtonToolbar >
                        <ToggleButtonGroup
                            type="radio"
                            name="result-display-type"
                            value={this.state.value}
                            onChange={this.handleChange}
                        >
                            <ToggleButton variant="outline-secondary" value={1}>Mosaique</ToggleButton>
                            <ToggleButton variant="outline-secondary" value={2}>List</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col>
                {this.state.value===1 ? <ProductMosaique results={this.props.results}/> : <ProductList results={this.props.results}/>}
                </Col>
            </Row>
            <Row className='flex-grow-1 justify-content-center align-items-end'>
                <Pagination>{this.state.pages}</Pagination>
            </Row>
        </div>
    }

}


export default Products
