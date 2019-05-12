import React, {Component} from 'react'
import ProductTile from "./ProductTile";
import Row from "react-bootstrap/Row";

class ProductMosaique extends Component {

    render() {
        return <Row className='justify-content-around' style={{marginTop: '20px'}}>
            {this.props.results.map(shop => {
                return shop.inventory.map(item => {
                    return <ProductTile key={item.productId} details={item}/>
                })
            })}
        </Row>
    }
}

export default ProductMosaique
