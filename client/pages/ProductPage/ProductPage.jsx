import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder, BuilderContent } from '@builder.io/react'
import { useLocation } from 'react-router-dom'
import swell from 'swell-js'

import config from '../../../config'

builder.init(config.apiKey)

const ProductPage = () => {
  const [builderContentJson, setBuilderContentJson] = useState(null)
  const [product, setProduct] = useState(null)
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const productPath = location.pathname.replace('/product/', '').toLowerCase()
  console.log(productPath)

  useEffect(() => {
    swell.init(config.storeId, config.publicKey)
    const getProduct = async () => {
      const product = await swell.products.get(productPath)

      setProduct(product)
    }

    const getCart = async () => {
      const cart = await swell.cart.get()
      console.log('cart', cart)
      setCart(cart)
    }

    // const fetchData = async () => {
    //   const result = await builder.getAll('product-page', {
    //     options: { noTargeting: true },
    //     apiKey: config.apiKey,
    //   })
    //   console.log('result', result)
    // }
    // fetchData()
    if (!product) {
      getProduct()
    }

    builder
      .get('product-page', { url: '/product/' })
      .promise()
      .then(setBuilderContentJson)
      .then(getCart())
      .finally(setLoading(false))
  }, [product])

  const addToCart = async (product) => {
    await swell.cart.addItem({
      product_id: product.id,
      quantity: 1,
    })
    console.log('added')

    const cart = await swell.cart.get()
    console.log('cart', cart)
    setCart(cart)
  }

  return loading ? (
    <div>loading</div>
  ) : (
    <BuilderComponent
      model="product-page"
      content={builderContentJson}
      data={{ product }}
      context={{
        addToCart
      }}
    />
  )
}

export default ProductPage
