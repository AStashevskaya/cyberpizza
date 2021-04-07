import React from 'react'
import {BiDish} from 'react-icons/bi'

import './index.scss'

const OrderDisplay = () => {
  return (
    <div className="display">
      <div className="display__status">
        <BiDish />
        <span>order status</span>
      </div>

      <span className="display__counter">4</span>
    </div>
  )
}

export default OrderDisplay
