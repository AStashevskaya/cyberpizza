import React from 'react'
import pt from 'prop-types'

import './Category.scss'

const Category = ({ text }) => {
  return <div className="category">{text}</div>
}

Category.propTypes = {
  text: pt.string,
}

export default Category
