import React from 'react'
import Category from '../Category'
import Cards from '../Cards'

import './Catalog.scss'

const Catalog = ({ data }) => {
  return (
    <div className="catalog">
      <Category text="pizza" />
      <Cards cards={data} />
    </div>
  )
}

export default Catalog
