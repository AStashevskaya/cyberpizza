import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder, BuilderContent } from '@builder.io/react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartProducts, removeProduct } from '../../redux/cart/actions'
import { fetchProducts } from '../../redux/catalog'

import config from '../../../config'
import Footer from '../../components/Footer/Footer'

builder.init(config.apiKey)

const Checkout = ({ content }) => {
  const [contentJson, setContentJson] = useState(null)
  const cart = useSelector((state) => state.cart.cart)
  const products = useSelector((state) => state.cart.products)
  const catalog = useSelector((state) => state.catalog.products)
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
    dispatch(fetchProducts())
    if (!content) {
      fetchContent()
    }
  }, [])

  const removeItemFromCart = (id) => {
    dispatch(removeProduct(id))
  }

  const updateCartItem = (id) => {

  }

  console.log('content', content, contentJson)
  console.log('cart from checkout', cart, products)
  return (
    <BuilderContent model="page">
      {() => {
        return (
          <>
            <BuilderComponent
              model="page"
              content={content || contentJson}
              data={{ cart, products, catalog }}
            />
            <Footer />
          </>
        )
      }}
    </BuilderContent>
  )
}

export default Checkout
