import React, { useState, useEffect } from 'react'
import { builder, BuilderComponent } from '@builder.io/react'
import swell from 'swell-js'

import config from '../../../config'

builder.init(config.apiKey)

const BUILDER_MODEL = 'products-categories'

const ProductCollection = ({ location }) => {
  const [builderContentJson, setBuilderContentJson] = useState(null)
  const [products, setProducts] = useState([])
  const { pathname } = location
  const category = pathname.replace('/products/', '')

  useEffect(() => {
    async function getProducts() {
      await swell.init(config.storeId, config.publicKey)

      const swellCategory = await swell.categories.get(category, { expand: ['products'] })
      setProducts(swellCategory.products.results)
    }
    builder
      .get('products-categories', { url: location.pathname })
      .promise()
      .then(setBuilderContentJson)
      .then(getProducts)
      .catch((error) => new Error(error))
  }, [])
  console.log('products', products)

  return <BuilderComponent model={BUILDER_MODEL} content={builderContentJson} data={{ products }} />
}

export default ProductCollection
