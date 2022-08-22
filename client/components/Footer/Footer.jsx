import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder, Builder, BuilderContent } from '@builder.io/react'

import config from '../../../config'

builder.init(config.apiKey)

const serviceCall = () => {
  const shouldPass = Math.random() > 0.5

  if (shouldPass) {
    return 'subscribed'
  } else {
    throw new Error('Failure')
  }
}

const Footer = () => {
  const [builderContentJson, setBuilderContentJson] = useState(null)
  const [subsResult, setSubsResult] = useState(null)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    builder.get('footer', { url: location.pathname }).promise().then(setBuilderContentJson)
  }, [])

  const subscribe = async () => {
    setError(null)
    setSubsResult(null)
    try {
      const result = serviceCall()
      setSubsResult(result)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleChangeSubsForm = (event) => {
    const newemail = event.target.value
    setEmail(newemail)
  }

  return (
    <BuilderComponent
      model="footer"
      content={builderContentJson}
      context={{ subscribe, handleChangeSubsForm }}
      data={{ email, error, subsResult }}
      style={{ position: 'absolute', bottom: 0 }}
    />
  )
}

export default Footer
