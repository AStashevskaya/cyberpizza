import React from 'react'
import pt from 'prop-types'

const PopupContent = ({ message }) => {
  return <div className="popup__content">{message}</div>
}

PopupContent.propTypes = {
  message: pt.string,
}

PopupContent.defaultProps = {
  message: '',
}

export default PopupContent
