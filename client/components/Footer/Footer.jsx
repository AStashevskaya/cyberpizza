import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder, Builder, BuilderContent } from '@builder.io/react'

import config from '../../../config'

builder.init(config.apiKey)

const Footer = () => {
  const [builderContentJson, setBuilderContentJson] = useState(null)

  useEffect(() => {
    builder.get('footer', { url: location.pathname }).promise().then(setBuilderContentJson)
  }, [])

  return <BuilderComponent model="footer" content={builderContentJson} />
}

export default Footer
