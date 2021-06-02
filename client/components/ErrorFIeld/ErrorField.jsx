import React from 'react'
import pt from 'prop-types'

import './ErrorField.scss'

const ErrorField = ({ text }) => {
  return <div className="error">{text}</div>
}

ErrorField.propTypes = {
  text: pt.string,
}

ErrorField.defaultProps = {
  text: '',
}

export default ErrorField
