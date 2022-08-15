import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder, BuilderContent } from '@builder.io/react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import swell from 'swell-js'

import config from '../../../config'
import Cart from '../../components/Cart'

builder.init(config.apiKey)

const ProductPage = ({ header }) => {
  const [builderContentJson, setBuilderContentJson] = useState(null)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const productPath = location.pathname.replace('/product/', '').toLowerCase()
  const dispatch = useDispatch()

  useEffect(() => {
    swell.init(config.storeId, config.publicKey)
    const getProduct = async () => {
      const product = await swell.products.get(productPath)

      setProduct(product)
    }
    if (!product) {
      getProduct()
    }

    builder
      .get('product-page', { url: '/product/' })
      .promise()
      .then(setBuilderContentJson)
      // .then(getCart())
      .finally(setLoading(false))
  }, [product])

  const addItemToCart = async (product) => {
    dispatch(addToCart(product.id))
  }

  return loading ? (
    <div>loading</div>
  ) : (
    <BuilderContent model="page">
      {' '}
      {() => {
        return (
          <>
            <BuilderComponent model="new-header" content={header && header.value} />
            <BuilderComponent
              model="product-page"
              content={builderContentJson}
              data={{ product }}
              context={{
                addToCart: addItemToCart,
              }}
            />
            <Cart />
          </>
        )
      }}
    </BuilderContent>
  )
}

export default ProductPage
