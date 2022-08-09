import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder, Builder, BuilderContent } from '@builder.io/react'

import config from '../../config'
import NotFound from './NotFoundPage/NotFound'
import ProductCollection from '../components/Collection/ProductCollection'
import ProductPage from '../pages/ProductPage/ProductPage'

builder.init(config.apiKey)

const PRODACTS_PATH = '/products/'
const PRODACT_PAGE = '/product/'

const CatchallPage = ({ location }) => {
  console.log('loc', location)
  const [content, setContent] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const isProductCollection = location.pathname.includes(PRODACTS_PATH)
  const isProductPage = location.pathname.includes(PRODACT_PAGE)
  console.log('isProductPage', isProductPage)

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
          console.log(path, location.pathname)
          if (
            (path && path.value === location.pathname) ||
            (path.value === '/http//localhost8080/' && location.pathname === '/')
          ) {
            return page
          }
        })

        const isLive = !Builder.isEditing && !Builder.isPreviewing
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
  ) : !notFound ? (
    <BuilderContent model="page">
      {(data) => {
        return (
          <>
            <div> looool</div>
            <BuilderComponent model="page" content={content}>
              <div className="loading">comp</div>
            </BuilderComponent>
          </>
        )
      }}
    </BuilderContent>
  ) : (
    <NotFound />
  )
}

export default CatchallPage
