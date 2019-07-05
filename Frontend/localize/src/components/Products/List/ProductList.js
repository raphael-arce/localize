import React, {Component} from 'react'
import ProductListItem from './ProductListItem'
class ProductList extends Component {

    render() {
        return <>
            {
                this.props.products.length === 0 ?
                    'NO RESULTS' :
                    this.props.products.map(item => {
                        return <ProductListItem key={item.productId} details={item}/>
                    })
            }
        </>
    }
}

export default ProductList
