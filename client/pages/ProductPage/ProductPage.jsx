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
import './productPage.scss'

builder.init(config.apiKey)

const defaultOptions = {
  pizza: {
    size: 'small',
    base: 'american',
  },
  drink: {
    size: '0.33',
  },
  wok: {
    size: 'medium',
    spicy: 'hot',
  },
}

const DEFAULT_PRODUCT_TYPE = 'pizza'

const ProductPage = () => {
  const [builderContentJson, setBuilderContentJson] = useState(null)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [variation, setVariation] = useState(null)
  const [sizes, setSizes] = useState([])
  const [base, setBase] = useState([])
  const [spicy, setSpicy] = useState([])
  const location = useLocation()
  const productPath = location.pathname.replace('/product/', '').toLowerCase()
  const [options, setOptions] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    swell.init(config.storeId, config.publicKey)
    const getProduct = async () => {
      const product = await swell.products.get(productPath)
      const sizeOption = product.options.find((option) => option.name === 'size')
      const baseOption = product.options.find((option) => option.name === 'base')
      const spiceOption = product.options.find((option) => option.name === 'spicy')
      const defaultVariation = await swell.products.variation(product, {
        ...options,
      })

      const productType =
        (product.attributes &&
          product.attributes.product_type &&
          product.attributes.product_type.value) ||
        DEFAULT_PRODUCT_TYPE

      sizeOption && setSizes(sizeOption.values)
      baseOption && setBase(baseOption.values)
      spiceOption && setSpicy(spiceOption.values)
      setOptions(defaultOptions[productType])
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

  const addItemToCart = async (product, options) => {
    dispatch(addToCart(product.id, options))
  }

  const chooseOption = async (product, option, options) => {
    const newOptions = { ...options, ...option }
    setOptions(newOptions)

    const swellVariation = await swell.products.variation(product, {
      ...newOptions,
    })

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
              data={{ product, variation, sizes, base, options, spicy }}
              context={{
                addToCart: addItemToCart,
                chooseOption,
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
