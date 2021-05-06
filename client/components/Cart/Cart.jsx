import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import CartListContainer from './CartListContainer/CartListContainer'
import Total from './Total/Total'
import { toggleCart, getCartProducts } from '../../redux/cart/actions'
import arrow from '../../assets/icons/right-arrow.svg'

import './Cart.scss'

const Cart = () => {
  const [showCart, setShowCart] = useState(false)
  const isOpen = useSelector((state) => state.cart.isOpen)
  const totalSum = useSelector((state) => state.cart.total)
  const cartId = useSelector((state) => state.cart.id)
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(toggleCart())
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
      console.log(cartId)
      dispatch(getCartProducts())
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
