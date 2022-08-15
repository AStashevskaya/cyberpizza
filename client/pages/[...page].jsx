import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder, Builder, BuilderContent } from '@builder.io/react'

import config from '../../config'
import NotFound from './NotFoundPage/NotFound'
import ProductCollection from '../components/Collection/ProductCollection'
import ProductPage from '../pages/ProductPage/ProductPage'
import Navigation from '../components/Navigation/Navigation'
import Cart from '../components/Cart'

builder.init(config.apiKey)

const PRODACTS_PATH = '/products/'
const PRODACT_PAGE = '/product/'

const CatchallPage = ({ location }) => {
  console.log('loc', location)
  const [content, setContent] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [links, setLinks] = useState([])
  const [headerJson, setHeaderJson] = useState(null)
  console.log('pathname', location.pathname)

  const isProductCollection = location.pathname && location.pathname.includes(PRODACTS_PATH)
  const isProductPage = location.pathname && location.pathname.includes(PRODACT_PAGE)
  console.log('isProductPage', isProductPage)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const pages = await builder.getAll('page', {
          options: { noTargeting: true },
          apiKey: config.apiKey,
        })

        const links = await builder.getAll('nav-links')
        console.log('links', links)
        setLinks(links)

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

        setContent(pagecontent)
        !pagecontent && setNotFound(true)
      } catch (error) {
        console.log('rrr', error)
      }
    }

    const fetchHeader = async () => {
      const header = await builder.get('new-header')
      console.log('header', header)

      setHeaderJson(header)
    }
    if (!isProductCollection && !isProductPage) {
      fetchContent()
    }

    fetchHeader()
  }, [])

  console.log('headerJson', headerJson)
  return isProductCollection ? (
    <ProductCollection location={location} header={headerJson} />
  ) : isProductPage ? (
    <ProductPage header={headerJson} />
  ) : !notFound ? (
    <BuilderContent model="page">
      {(data) => {
        return (
          <>
            <BuilderComponent model="new-header" content={headerJson && headerJson.value} />
            <BuilderComponent model="page" content={content} />
            <Cart />
          </>
        )
      }}
    </BuilderContent>
  ) : (
    <NotFound />
  )
}

export default CatchallPage
