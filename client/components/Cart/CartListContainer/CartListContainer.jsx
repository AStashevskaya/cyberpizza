import React from 'react'
import { useSelector } from 'react-redux'
import CartItemsList from '../CartItemsList/CartItemList'

const CartListContainer = () => {
  const products = useSelector((state) => state.cart.products)

  return (
    <div className="cart__container">
      <CartItemsList products={products} />
    </div>
  )
}

export default CartListContainer
