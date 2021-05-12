import React from 'react'

import OrderDisplay from '../Order'
import Filter from '../Filter'
import AuthField from '../AuthField'

import './header.scss'

const Header = () => {
  return (
    <header>
      <AuthField />
      <Filter />
      <OrderDisplay />
    </header>
  )
}

export default Header
