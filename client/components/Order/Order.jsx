import React from 'react'
import {BiDish} from 'react-icons/bi'

import './Order.scss'

const OrderDisplay = () => {
  return (
    <div className="order">
      <div className="order__status">
        <BiDish />
        <span>order status</span>
      </div>

      <span className="order__counter">4</span>
    </div>
  )
}

export default OrderDisplay
