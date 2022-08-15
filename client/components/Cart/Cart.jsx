import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import swell from 'swell-js'

import config from '../../../config'

import CartListContainer from './CartListContainer/CartListContainer'
import Total from './Total/Total'
import Popup from '../Popup/'

import { toggleCart, getCartProducts, removeProduct } from '../../redux/cart/actions'
import { createOrder, order } from '../../redux/order'
import arrow from '../../assets/icons/right-arrow.svg'

import './Cart.scss'

const Cart = () => {
  const [showCart, setShowCart] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const isOpen = useSelector((state) => state.cart.isOpen)
  const totalSum = useSelector((state) => state.cart.total)
  const message = useSelector((state) => state.order.message)
  const products = useSelector((state) => state.cart.products)
  const currency = useSelector((state) => state.cart.currency)

  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(toggleCart())
  }, [dispatch])

  const removeItem = async (id) => {
    dispatch(removeProduct(id))
  }

  const sendOrder = useCallback(() => {
    dispatch(createOrder())
    setShowPopup(true)
    setShowCart(false)
  }, [dispatch])

  useEffect(() => {
    if (isOpen) {
      setShowCart(true)
    } else {
      setShowCart(false)
    }
  }, [isOpen])

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
            <CartListContainer products={products} removeItem={removeItem} />
            <Total sum={totalSum} currency={currency} />
            <button onClick={sendOrder} className="cart__button">
              Submit order
            </button>
          </div>
        </div>
      </div>
      <Popup isOpen={!!message && showPopup} setIsOpen={setShowPopup} message={message} />
    </div>
  )
}

export default Cart
