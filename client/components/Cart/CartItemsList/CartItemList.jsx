import React from 'react'

import CartItem from '../CartItem/CartItem'

const CartItemList = () => {
  const productsArr = [
    {
      name: 'Pepperoni',
      image: '/files/pepperoni.png',
      price: 12,
      quantity: 1,
    },
    {
      name: '4 cheese',
      image: '/files/4-cheese.png',
      price: 13,
      quantity: 1,
    },
    {
      name: 'Italian',
      image: '/files/italian.png',
      price: 14,
      quantity: 1,
    },
  ]
  return (
    <div className="cart__item-list">
      {productsArr.map((el) => (
        <CartItem key={el.name} image={el.image} quantity={el.quantity} name={el.name} />
      ))}
    </div>
  )
}

export default CartItemList
