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
            pages: items,
            products: []
        }

        this.handleChange = this.handleChange.bind(this)
        //this.componentDidMount = this.componentDidMount.bind(this)
        this.componentDidUpdate = this.componentDidUpdate.bind(this)
        this.getAllProducts = this.getAllProducts.bind(this)
    }

    handleChange(value, event) {
        this.setState({ value });
    }

    componentDidMount() {
        this.getAllProducts()
    }


    componentDidUpdate(prevProps) {
        if(this.props.results !== prevProps.results) {
            this.getAllProducts()
        }
    }

    getAllProducts() {
        let products = []
        this.props.results.forEach(shop => {
            shop.inventory.forEach(item => {
                let alreadyExisting = false
                products.forEach(product => {
                    if(product.productId === item.productId) {
                        alreadyExisting = true
                    }
                })
                if(!alreadyExisting) {
                    products.push(item)
                }
            })
        })
        this.setState({products: products})
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
                    {this.state.value===1 ? <ProductMosaique products={this.state.products}/> : <ProductList products={this.state.products}/>}
                </Col>
            </Row>
            <Row className='flex-grow-1 justify-content-center align-items-end'>
                <Pagination>{this.state.pages}</Pagination>
            </Row>
        </div>
    }

}


export default Products
