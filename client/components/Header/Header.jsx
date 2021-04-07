import React from 'react'

import OrderDisplay from '../OrderDisplay'
import Filter from '../Filter'

import './header.scss'

const Header = () => {
  return (
    <header>
      <Filter />
      <OrderDisplay />
    </header>
  )
}

export default Header
