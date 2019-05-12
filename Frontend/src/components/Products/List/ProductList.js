import React, {Component} from 'react'
import ProductListItem from './ProductListItem'
class ProductList extends Component {

    render() {
        return <>
            {this.props.results.map(shop => {
                return shop.inventory.map(item => {
                    return <ProductListItem key={item.productId} details={item}/>

                })
            })}
        </>
    }
}

export default ProductList
