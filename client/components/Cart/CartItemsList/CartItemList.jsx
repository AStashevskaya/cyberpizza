import React from 'react'
import pt from 'prop-types'

import CartItemContainer from '../CartItemContainer/CartItemContainer'

const CartItemList = ({ products, removeItem }) => {
  return (
    <div className="cart__item-list">
      {products.map((el) => (
        <CartItemContainer key={el._id || el.id} product={el} removeItem={removeItem} />
      ))}
    </div>
  )
}

CartItemList.propTypes = {
  products: pt.array,
}

CartItemList.defaultProps = {
  products: [],
}

export default CartItemList
