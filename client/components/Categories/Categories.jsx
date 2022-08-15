import { builder } from '@builder.io/sdk'

builder.init('0dfd4cb05a5c4e18b915e70b25a6a05e')

builder
  .get('header')
  .promise()
  .then(({ data }) => {
    console.log('data', data)
  })
