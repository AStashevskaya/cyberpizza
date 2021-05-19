import React from 'react'
import { useSelector } from 'react-redux'

import Category from '../Category'
import Cards from '../Cards'

import './Catalog.scss'

const Catalog = () => {
  const products = useSelector((state) => state.catalog.products)
  return (
    <div className="catalog">
      <Category text="pizza" />
      <Cards cards={products} />
    </div>
  )
}

export default Catalog
