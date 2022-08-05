import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder } from '@builder.io/react'

import config from '../../config'
import NotFound from './NotFoundPage/NotFound'
import ProductCollection from '../components/Collection/ProductCollection'

builder.init(config.apiKey)

const PRODACTS_PATH = '/products/'

const CatchallPage = ({ location }) => {
  const [content, setContent] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const isProductCollection = location.pathname.includes(PRODACTS_PATH)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const pages = await builder.getAll('page', {
          options: { noTargeting: true },
          apiKey: config.apiKey,
        })
        console.log(pages)

        const pagecontent = pages.find((page) => {
          const path = page.query.find((value) => value.property === 'urlPath')
          if (path && path.value === location.pathname) {
            return page
          }
        })

        setContent(pagecontent)
        !pagecontent && setNotFound(true)
      } catch (error) {
        console.log('rrr', error)
      }
    }
    if (!isProductCollection) {
      fetchContent()
    }
  }, [location.pathname])

  return isProductCollection ? (
    <ProductCollection location={location} />
  ) : !notFound ? (
    <BuilderComponent model="page" content={content}>
      <div className="loading">Loading...</div>
    </BuilderComponent>
  ) : (
    <NotFound />
  )
}

export default CatchallPage
