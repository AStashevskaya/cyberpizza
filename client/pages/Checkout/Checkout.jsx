import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder, BuilderContent } from '@builder.io/react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import swell from 'swell-js'
import { addToCart, getCartProducts } from '../../redux/cart/actions'

import config from '../../../config'
import Cart from '../../components/Cart'
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'

builder.init(config.apiKey)

const Checkout = ({ content }) => {
  const [contentJson, setContentJson] = useState(null)
  const cart = useSelector((state) => state.cart.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchContent = async () => {
      const pages = await builder.getAll('page', {
        options: { noTargeting: true },
        apiKey: config.apiKey,
      })

      const pagecontent = pages.find((page) => {
        const path = page.query.find((value) => value.property === 'urlPath')
        console.log(path, location.pathname)
        if (path && path.value === '/checkout') {
          return page
        }
      })

      console.log('page', pagecontent)

      pagecontent && setContentJson(pagecontent)
    }

    dispatch(getCartProducts())
    if (!content) {
      fetchContent()
    }
  }, [])

  console.log('content', content, contentJson)
  return (
    <BuilderContent model="page">
      {() => {
        return (
          <>
            <Navigation />
            <BuilderComponent model="page" content={content || contentJson} data={{ cart }} />
            <Footer />
          </>
        )
      }}
    </BuilderContent>
  )
}

export default Checkout
