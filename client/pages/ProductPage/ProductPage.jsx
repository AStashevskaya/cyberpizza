import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder, BuilderContent } from '@builder.io/react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import swell from 'swell-js'
import { addToCart } from '../../redux/cart/actions'

import config from '../../../config'
import Cart from '../../components/Cart'
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'

builder.init(config.apiKey)

const ProductPage = () => {
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
      .finally(setLoading(false))
  }, [product])

  const addItemToCart = async (product) => {
    dispatch(addToCart(product.id))
  }

  return loading ? (
    <div>loading</div>
  ) : (
    <BuilderContent model="product-page">
      {() => {
        return (
          <>
            <Navigation />
            <BuilderComponent
              model="product-page"
              content={builderContentJson}
              data={{ product }}
              context={{
                addToCart: addItemToCart,
              }}
            />
            <Cart />
            <Footer />
          </>
        )
      }}
    </BuilderContent>
  )
}

export default ProductPage
