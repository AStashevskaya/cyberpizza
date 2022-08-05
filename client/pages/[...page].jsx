import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder } from '@builder.io/react'

import config from '../../config'
import NotFound from './NotFoundPage/NotFound'

builder.init(config.apiKey)

const CatchallPage = ({ location }) => {
  const [content, setContent] = useState(null)
  const [notFound, setNotFound] = useState(false)

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
    fetchContent()
  }, [location.pathname])

  console.log('not found', notFound)
  return !notFound ? (
    <BuilderComponent model="page" content={content}>
      <div className="loading">Loading...</div>
    </BuilderComponent>
  ) : (
    <NotFound />
  )
}

export default CatchallPage
