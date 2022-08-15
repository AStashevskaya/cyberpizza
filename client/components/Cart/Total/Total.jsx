import React from 'react'
import pt from 'prop-types'

const Total = ({ sum, currency }) => {
  return <div className="cart__total">Total: {`${sum} ${currency || '$'}`}</div>
}

Total.propTypes = {
  sum: pt.number,
}

export default Total
