import React from 'react'
import pt from 'prop-types'

const Total = ({ sum }) => {
  return <div className="cart__total">Total: {sum}$</div>
}

Total.propTypes = {
  sum: pt.number,
}

export default Total
