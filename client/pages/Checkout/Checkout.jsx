import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder, BuilderContent } from '@builder.io/react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import swell from 'swell-js'
import { addToCart } from '../../redux/cart/actions'

import config from '../../../config'
import Cart from '../../components/Cart'
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'

builder.init(config.apiKey)

const Checkout = ({ content }) => {
    console.log('content', content)
  return !content ? (
    <BuilderComponent model="page" content={content} />
  ) : (
    <BuilderContent model="page">
      {() => {
        return (
          <>
            <Navigation />
            <BuilderComponent model="page" content={content} />
            <Cart />
            <Footer />
          </>
        )
      }}
    </BuilderContent>
  )
}

export default Checkout
