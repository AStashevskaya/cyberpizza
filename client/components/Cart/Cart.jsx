import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import CartItemList from './CartItemsList/CartItemList'
import { toggleCart } from '../../redux/cart/actions'

import './Cart.scss'

const Cart = () => {
  const [showCart, setShowCart] = useState(false)
  const isOpen = useSelector((state) => state.cart.isOpen)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(toggleCart())
  }

  useEffect(() => {
    if (isOpen) {
      setShowCart(true)
    } else {
      setShowCart(false)
    }
    console.log(showCart)
  }, [isOpen])

  return (
    <div className={showCart ? 'cart active' : 'cart'}>
      <div className="cart__overlay">
        <div className="cart__container">
          <span onClick={handleClick}> Hide </span>
          <div className="cart__info">
            <span className="cart__order">Orders:</span>
            <CartItemList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
