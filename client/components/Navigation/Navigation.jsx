import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder, Builder, BuilderContent } from '@builder.io/react'

import config from '../../../config'

builder.init(config.apiKey)

const Navigation = () => {
  const [builderContentJson, setBuilderContentJson] = useState(null)

  useEffect(() => {
    builder.get('new-header', { url: location.pathname }).promise().then(setBuilderContentJson)
  }, [])

  return (
    <BuilderComponent
      model="new-header"
      content={builderContentJson}
    />
  )
}

export default Navigation
