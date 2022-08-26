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
    size: '0.3',
  },
  wok: {
    size: 'small',
    spicy: 'hot',
    noodles: 'rice',
  },
}

const ProductPage = () => {
  const [builderContentJson, setBuilderContentJson] = useState(null)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [variation, setVariation] = useState(null)
  const [sizes, setSizes] = useState([])
  const [base, setBase] = useState([])
  const location = useLocation()
  const productPath = location.pathname.replace('/product/', '').toLowerCase()
  const [options, setOptions] = useState(defaultOptions[productPath])
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

      sizeOption && setSizes(sizeOption.values)
      baseOption && setBase(baseOption.values)
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
    console.log('opt from memo', options, product, this)
    dispatch(addToCart(product.id, options))
  }

  const chooseSize = async (product, name, options) => {
    console.log('size options', options)
    const newOptions = { ...options, size: name }

    console.log('size new opt', newOptions)
    setOptions(newOptions)

    const swellVariation = await swell.products.variation(product, {
      ...newOptions,
    })
    setVariation(swellVariation)
  }

  const chooseBase = async (product, name, options) => {
    const newOptions = { ...options, base: name }
    setOptions(newOptions)
    console.log('vase opt', options, 'name', options)

    const swellVariation = await swell.products.variation(product, {
      ...newOptions,
    })
    console.log('base new opt', newOptions)

    console.log('swellVariation', swellVariation)
    setVariation(swellVariation)
  }

  const chooseNoodles = async (product, name, options) => {
    const newOptions = { ...options, noodles: name }
    setOptions(newOptions)
    console.log('vase opt', options, 'name', options)

    const swellVariation = await swell.products.variation(product, {
      ...newOptions,
    })
    console.log('base new opt', newOptions)

    console.log('swellVariation', swellVariation)
    setVariation(swellVariation)
  }

  const chooseOption = async (product, option, options) => {
    const newOptions = { ...options, ...option }
    setOptions(newOptions)
    console.log('choose Option', options, 'name', option)

    const swellVariation = await swell.products.variation(product, {
      ...newOptions,
    })
    console.log('base new opt', newOptions)

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
              data={{ product, variation, sizes, base, options, productType: productPath }}
              context={{
                addToCart: addItemToCart,
                chooseSize: chooseSize,
                chooseBase,
                chooseNoodles,
                chooseOption
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
