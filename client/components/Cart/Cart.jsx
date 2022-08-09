import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import swell from 'swell-js'

import config from '../../../config'

import CartListContainer from './CartListContainer/CartListContainer'
import Total from './Total/Total'
import Popup from '../Popup/'

import { toggleCart } from '../../redux/cart/actions'
import { createOrder, order } from '../../redux/order'
import arrow from '../../assets/icons/right-arrow.svg'

import './Cart.scss'

const Cart = () => {
  const [showCart, setShowCart] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [cart, setCart] = useState(null)

  useEffect(() => {
    swell.init(config.storeId, config.publicKey)

    const getCart = async () => {
      const cart = await swell.cart.get()
      console.log('cart', cart)
      setCart(cart)
    }

    getCart()
  }, [])

  const isOpen = useSelector((state) => state.cart.isOpen)
  // const totalSum = useSelector((state) => state.cart.total)
  const message = useSelector((state) => state.order.message)

  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(toggleCart())
  }, [dispatch])

  const removeItem = async (id) => {
    await swell.cart.removeItem(id)
    await swell.cart.get()
    setCart(cart)
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
            <CartListContainer products={cart ? cart.items : []} removeItem={removeItem} />
            <Total sum={cart ? cart.grand_total : 0} />
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
