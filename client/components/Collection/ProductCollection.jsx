import React, { useState, useEffect } from 'react'
import { builder, BuilderComponent, BuilderContent } from '@builder.io/react'
import swell from 'swell-js'
import { useDispatch } from 'react-redux'
import Header from '../Header'
import Cart from '../Cart'
import { addToCart } from '../../redux/cart/actions'

import config from '../../../config'

builder.init(config.apiKey)

const BUILDER_MODEL = 'products-categories'

const ProductCollection = ({ location }) => {
  const [builderContentJson, setBuilderContentJson] = useState(null)
  const [products, setProducts] = useState([])
  const { pathname } = location
  const category = pathname.replace('/products/', '')
  const dispatch = useDispatch()

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

  const addItemToCart = async (productId) => {
    console.log(productId, 'added')
    dispatch(addToCart(productId))
  }

  return (
    <BuilderContent model={BUILDER_MODEL}>
      {(data) => {
        return (
          <>
            <Header />
            <Cart />
            <BuilderComponent
              model={BUILDER_MODEL}
              content={builderContentJson}
              data={{ products }}
              context={{ addToCart: addItemToCart }}
            />
          </>
        )
      }}
    </BuilderContent>
  )
}

export default ProductCollection
