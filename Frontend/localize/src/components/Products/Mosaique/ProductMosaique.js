import React, {Component} from 'react'
import ProductTile from "./ProductTile";
import Row from "react-bootstrap/Row";

class ProductMosaique extends Component {

    render() {
        return <Row style={{marginTop: '20px'}}>
            {this.props.products.length === 0 ?
                'NO RESULTS' :
                this.props.products.map(item => {
                    return <ProductTile key={item.productId} details={item}/>
                })
            }
        </Row>
    }
}

export default ProductMosaique
