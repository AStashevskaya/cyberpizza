import React from 'react'
import pt from 'prop-types'

import './CartItem.scss'

const CartItem = ({ product, handleClick, removeItem }) => {
  // const { quantity, name, image } = product
  const { quantity, name, images } = product.product
  console.log(product)

  return (
    <div className="cart__item">
      <div className="item__image">
        <img src={images[0] && images[0].file.url} alt={name} />
      </div>
      <div className="item__content">
        <span>{name}</span>
        <div className="item__quantity">{product.quantity}</div>
        <div className="item__close" onClick={() => removeItem(product.id)}>
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
