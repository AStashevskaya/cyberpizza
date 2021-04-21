import React from 'react'
import { useDispatch } from 'react-redux'

import { toggleCart } from '../../redux/cart/actions'

import dish from '../../assets/icons/dish.svg'
import './Order.scss'

const OrderDisplay = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    console.log('cart should open')
    dispatch(toggleCart())
  }

  return (
    <div className="order">
      <div className="order__status" onClick={handleClick}>
        <img src={dish} alt="dish" />
        <span>order status</span>
      </div>

      <span className="order__counter">4</span>
    </div>
  )
}

export default OrderDisplay
