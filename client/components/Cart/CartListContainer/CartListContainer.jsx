import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CartItemsList from '../CartItemsList/CartItemList'
import swell from 'swell-js'

import config from '../../../../config'

const CartListContainer = ({ products, removeItem }) => {
  // const products = useSelector((state) => state.cart.products)
  // const [cart, setCart] = useState(null)

  // useEffect(() => {
  //   swell.init(config.storeId, config.publicKey)

  //   const getCart = async () => {
  //     const cart = await swell.cart.get()
  //     console.log('cart', cart)
  //     setCart(cart)
  //   }

  //   getCart()
  // }, [])

  return (
    <div className="cart__container">
      <CartItemsList products={products} removeItem={removeItem} />
    </div>
  )
}

export default CartListContainer
