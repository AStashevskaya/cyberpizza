import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder, Builder, BuilderContent } from '@builder.io/react'

import config from '../../config'
import NotFound from './NotFoundPage/NotFound'
import ProductCollection from '../components/Collection/ProductCollection'
import ProductPage from '../pages/ProductPage/ProductPage'
import Cart from '../components/Cart'
import Footer from '../components/Footer/Footer'
import Navigation from '../components/Navigation/Navigation'
import Checkout from '../pages/Checkout/Checkout'

builder.init(config.apiKey)

const PRODACTS_PATH = '/products/'
const PRODACT_PAGE = '/product/'
const CHECKOUT_PAGE = '/checkout'

const CatchallPage = ({ location }) => {
  const [content, setContent] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const isProductCollection = location.pathname && location.pathname.includes(PRODACTS_PATH)
  const isProductPage = location.pathname && location.pathname.includes(PRODACT_PAGE)
  const isCheckout = location.pathname && location.pathname.includes(CHECKOUT_PAGE)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const pages = await builder.getAll('page', {
          options: { noTargeting: true },
          apiKey: config.apiKey,
        })

        const pagecontent = pages.find((page) => {
          const path = page.query.find((value) => value.property === 'urlPath')
          console.log(path, location.pathname)
          if (
            (path && path.value === location.pathname) ||
            (path.value === '/http//localhost8080/' && location.pathname === '/')
          ) {
            return page
          }
        })

        console.log('pagecontent', pagecontent)

        setContent(pagecontent)
        !pagecontent && setNotFound(true)
      } catch (error) {
        console.log('rrr', error)
      }
    }

    if (!isProductCollection && !isProductPage) {
      fetchContent()
    }
  }, [])

  return isProductCollection ? (
    <ProductCollection location={location} />
  ) : isProductPage ? (
    <ProductPage />
  ) : isCheckout ? (
    <Checkout content={content} />
  ) : !notFound ? (
    <BuilderContent model="page">
      {(data) => {
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
  ) : (
    <NotFound />
  )
}

export default CatchallPage
