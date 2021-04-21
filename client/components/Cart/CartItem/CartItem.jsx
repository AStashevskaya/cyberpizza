import React from 'react'
import pt from 'prop-types'

import './CartItem.scss'

const CartItem = ({ image, name, quantity }) => {
  return (
    <div className="cart__item">
      <div className="item__image">
        <img src={image} alt={name} />
      </div>
      <div className="item__content">
        <span>{name}</span>
        <div className="item__quantity">{quantity}</div>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  image: pt.string,
  name: pt.string,
  quantity: pt.number,
}

export default CartItem
