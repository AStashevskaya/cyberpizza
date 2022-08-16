import React, { useState, useEffect } from 'react'
import { builder, BuilderComponent, BuilderContent } from '@builder.io/react'
import swell from 'swell-js'
import { useDispatch } from 'react-redux'
import Cart from '../Cart'
import Footer from '../Footer/Footer'
import { addToCart } from '../../redux/cart/actions'

import config from '../../../config'

builder.init(config.apiKey)

const BUILDER_MODEL = 'products-categories'

const ProductCollection = ({ location, header }) => {
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
    dispatch(addToCart(productId))
  }

  return (
    <BuilderContent model={BUILDER_MODEL}>
      {(data) => {
        return (
          <>
            <BuilderComponent model="new-header" content={header && header.value} />
            <Cart />
            <BuilderComponent
              model={BUILDER_MODEL}
              content={builderContentJson}
              data={{ products }}
              context={{ addToCart: addItemToCart }}
            />
            <Footer />
          </>
        )
      }}
    </BuilderContent>
  )
}

export default ProductCollection
