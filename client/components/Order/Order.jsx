import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleCart } from '../../redux/cart/actions'

import dish from '../../assets/icons/dish.svg'
import './Order.scss'

const OrderDisplay = () => {
  const dispatch = useDispatch()
  const quantity = useSelector((state) => state.cart.quantity)
  const status = useSelector((state) => state.order.status)

  const handleClick = useCallback(() => {
    dispatch(toggleCart())
  }, [dispatch])

  return (
    <div className="order">
      <div className="order__status" onClick={handleClick}>
        <img src={'./icons/dish.svg'} alt="dish" />
        <span>{status ? status : 'Cart'}</span>
      </div>

      <span className="order__counter">{quantity}</span>
    </div>
  )
}

export default OrderDisplay
