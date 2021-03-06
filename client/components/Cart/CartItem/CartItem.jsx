import React from 'react'
import pt from 'prop-types'

import './CartItem.scss'

const CartItem = ({ product, handleClick }) => {
  const { quantity, name, image } = product

  return (
    <div className="cart__item">
      <div className="item__image">
        <img src={image} alt={name} />
      </div>
      <div className="item__content">
        <span>{name}</span>
        <div className="item__quantity">{quantity}</div>
        <div className="item__close" onClick={handleClick}>
          &times;
        </div>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  product: pt.object,
  handleClick: pt.func,
}

CartItem.defaultProps = {
  product: {},
  handleClick: () => {},
}

export default CartItem
