import React from 'react'
import Category from '../Category'
import Cards from '../Cards'

import './Catalog.scss'

const Catalog = () => {
  return (
    <div className="catalog">
      <Category text="pizza" />
      <Cards />
    </div>
  )
}

export default Catalog
