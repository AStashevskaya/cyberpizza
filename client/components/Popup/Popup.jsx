import React, { useCallback } from 'react'
import pt from 'prop-types'

import './Popup.scss'

const Popup = ({ Component, isOpen, handleSubmitForm, product, handleClose, toCreate }) => {
  return isOpen ? (
    <div className={isOpen ? 'modal active' : 'modal'}>
      <div className="modal__overlay">
        <div className="modal__window">
          <div className="modal__header">
            <span onClick={handleClose}>&times;</span>
          </div>
          <div className="modal__content">
            <Component handleSubmitForm={handleSubmitForm} product={product} toCreate={toCreate}/>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  )
}

Popup.propTypes = {
  Component: pt.func.isRequired,
  isOpen: pt.bool.isRequired,
  handleSubmitForm: pt.func,
  product: pt.object,
  handleClose: pt.func,
  toCreate: pt.bool,
}

Popup.defaultProps = {
  Component: () => '',
  isOpen: false,
  handleSubmitForm: () => {},
  product: {},
  handleClose: () => {},
  toCreate: true,
}

export default Popup
