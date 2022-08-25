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
import { useCallback } from 'react'

builder.init(config.apiKey)

const defaultOptions = {
  size: 'small',
  base: 'american',
}

const ProductPage = () => {
  const [builderContentJson, setBuilderContentJson] = useState(null)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [options, setOptions] = useState(defaultOptions)
  const [variation, setVariation] = useState(null)
  const [sizes, setSizes] = useState([])
  const [base, setBase] = useState([])
  const location = useLocation()
  const productPath = location.pathname.replace('/product/', '').toLowerCase()
  const dispatch = useDispatch()

  useEffect(() => {
    swell.init(config.storeId, config.publicKey)
    const getProduct = async () => {
      const product = await swell.products.get(productPath)
      const sizeOption = product.options.find((option) => option.name === 'size')
      const baseOption = product.options.find((option) => option.name === 'base')
      const defaultVariation = await swell.products.variation(product, {
        ...options,
      })

      setSizes(sizeOption.values)
      setBase(baseOption.values)
      setProduct(product)
      setVariation(defaultVariation)
    }

    if (!product) {
      getProduct()
    }

    builder
      .get('product-page', { url: '/product/' })
      .promise()
      .then(setBuilderContentJson)
      .finally(setLoading(false))
  }, [product, productPath])

  const addItemToCart = async (product) => {
    dispatch(addToCart(product.id))
  }

  const chooseSize = async (product, name) => {
    setOptions({ size: name, ...options })
    const swellVariation = await swell.products.variation(product, {
      ...options,
    })
    console.log('swellVariation', swellVariation)

    setVariation(swellVariation)
  }

  const chooseBase = async (product, name) => {
    setOptions({ base: name, ...options })

    const swellVariation = await swell.products.variation(product, {
      ...options,
    })

    console.log('swellVariation', swellVariation)
    setVariation(swellVariation)
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
              data={{ product, variation, sizes, base, defaultOptions }}
              context={{
                addToCart: addItemToCart,
                chooseSize: chooseSize,
                chooseBase,
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
