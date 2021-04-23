import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import CartItem from '../CartItem/CartItem'

const CartItemList = () => {
  const cartsItemList = useSelector((state) => state.cart.products)
  console.log('cartsItemList', cartsItemList)

  return (
    <div className="cart__item-list">
      {cartsItemList.map((el) => (
        <CartItem
          key={el.productId}
          image={el.image}
          quantity={el.quantity}
          name={el.name}
          id={el.productId}
        />
      ))}
    </div>
  )
}

export default CartItemList
