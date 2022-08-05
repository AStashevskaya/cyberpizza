import { builder } from '@builder.io/react'
import config from '../config'

const MODEL_NAME = 'page'
console.log('key', config.apiKey)

builder.init(config.apiKey)

export const fetchContent = async () => {
  const content = await builder
    .get(MODEL_NAME, {
      // Optional custom query
      query: {
        'data.customField.$gt': 100,
      },
      // Optional custom targeting
      userAttributes: {
        urlPath: '/', // Most Builder content is targeted at least by the URL path
      },
    })
    .promise()

  console.log('content', content)
  return content
}
