import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder } from '@builder.io/react'
import { useLocation } from 'react-router-dom'
import swell from 'swell-js'

import config from '../../../config'

builder.init(config.apiKey)

const ProductPage = () => {
  const [builderContentJson, setBuilderContentJson] = useState(null)
  const [product, setProduct] = useState(null)
  const location = useLocation()
  const productPath = location.pathname.replace('/product/', '').toLowerCase()
  console.log(productPath)

  useEffect(() => {
    swell.init(config.storeId, config.publicKey)
    const getProduct = async () => {
      const product = await swell.products.get(productPath)

      setProduct(product)
    }

    // const fetchData = async () => {
    //   const result = await builder.getAll('product-page', {
    //     options: { noTargeting: true },
    //     apiKey: config.apiKey,
    //   })
    //   console.log('result', result)
    // }
    // fetchData()
    builder
      .get('product-page', { url: '/product/' })
      .promise()
      .then(setBuilderContentJson)
      .then(getProduct())
  }, [])
  console.log('builderContentJson', builderContentJson)

  return <BuilderComponent model="product-page" content={builderContentJson} data={{ product }} />
}

export default ProductPage
