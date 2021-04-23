import React from 'react'
import pt from 'prop-types'
import { useDispatch } from 'react-redux'

import { removeProduct } from '../../../redux/cart/actions'

import './CartItem.scss'

const CartItem = ({ image, name, quantity, id }) => {
  const dispatch = useDispatch()

  const deleteProduct = (id) => {
    dispatch(removeProduct(id))
  }

  return (
    <div className="cart__item">
      <div className="item__image">
        <img src={image} alt={name} />
      </div>
      <div className="item__content">
        <span>{name}</span>
        <div className="item__quantity">{quantity}</div>
        <div className="item__close" onClick={() => deleteProduct(id)}>
          &times;
        </div>
      </div>
    </div>
  )
}

CartItem.propTypes = {
  image: pt.string,
  name: pt.string,
  quantity: pt.number,
  id: pt.string,
}

export default CartItem
