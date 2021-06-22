import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import CartListContainer from './CartListContainer/CartListContainer'
import Total from './Total/Total'
import Popup from '../Popup/'

import { toggleCart, getCartProducts } from '../../redux/cart/actions'
import { createOrder, getOrderStatus } from '../../redux/order'
import arrow from '../../assets/icons/right-arrow.svg'

import './Cart.scss'

const Cart = () => {
  const [showCart, setShowCart] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const isOpen = useSelector((state) => state.cart.isOpen)
  const totalSum = useSelector((state) => state.cart.total)
  const cartId = useSelector((state) => state.cart.id)
  const orderId = useSelector((state) => state.order.id)
  const message = useSelector((state) => state.order.message)
  console.log('id', orderId)

  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(toggleCart())
  }, [dispatch])

  const sendOrder = useCallback(() => {
    dispatch(createOrder())
    setShowPopup(true)
    console.log('order is created')
  }, [dispatch])

  useEffect(() => {
    if (isOpen) {
      setShowCart(true)
    } else {
      setShowCart(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (cartId) {
      dispatch(getCartProducts())
    }

    if (orderId) {
      console.log('orderId', orderId)
      dispatch(getOrderStatus())
    }
  }, [])

  return (
    <div className={showCart ? 'cart active' : 'cart'}>
      <div className="cart__overlay">
        <div className="cart__wrapper">
          <span onClick={handleClick}>
            Hide
            <img src={arrow} alt="arrow" />
          </span>
          <div className="cart__info">
            <span className="cart__order">Orders:</span>
            <CartListContainer />
            <Total sum={totalSum} />
            <button onClick={sendOrder}>Order</button>
          </div>
        </div>
      </div>
      <Popup isOpen={showPopup} setIsOpen={setShowPopup} message={message} />
    </div>
  )
}

export default Cart
