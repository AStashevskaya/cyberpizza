import React, { useEffect, useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import CartItemList from './CartItemsList/CartItemList'
import Total from './Total/Total'
import { toggleCart, getCartProducts } from '../../redux/cart/actions'

import './Cart.scss'

const Cart = () => {
  const [showCart, setShowCart] = useState(false)
  const isOpen = useSelector((state) => state.cart.isOpen)
  const totalSum = useSelector((state) => state.cart.total)
  const cartId = useSelector((state) => state.cart.id)
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(toggleCart())
  })

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
  }, [cartId, dispatch])

  return (
    <div className={showCart ? 'cart active' : 'cart'}>
      <div className="cart__overlay">
        <div className="cart__container">
          <span onClick={handleClick}> Hide </span>
          <div className="cart__info">
            <span className="cart__order">Orders:</span>
            <CartItemList />
            <Total sum={totalSum} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
