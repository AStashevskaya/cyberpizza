import React from 'react'

import dish from '../../assets/icons/dish.svg'
import './Order.scss'

const OrderDisplay = () => {
  return (
    <div className="order">
      <div className="order__status">
        {/* <BiDish /> */}
        <img src={dish} alt='dish' />
        <span>order status</span>
      </div>

      <span className="order__counter">4</span>
    </div>
  )
}

export default OrderDisplay
