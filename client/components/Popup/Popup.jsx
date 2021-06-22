import React, { useCallback } from 'react'
import pt from 'prop-types'

import PopupContent from './PopupContent/PopupContent'

import './Popup.scss'

const Popup = ({
  Component,
  isOpen,
  handleSubmitForm,
  product,
  setIsOpen,
  toCreate,
  message,
  user,
}) => {
  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  return isOpen ? (
    <div className={isOpen ? 'modal active' : 'modal'}>
      <div className="modal__overlay">
        <div className="modal__window">
          <div className="modal__header">
            <span onClick={handleClose}>&times;</span>
          </div>
          <div className="modal__content">
            <Component
              handleSubmitForm={handleSubmitForm}
              product={product}
              user={user}
              toCreate={toCreate}
              message={message}
            />
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
  user: pt.object,
  setIsOpen: pt.func,
  toCreate: pt.bool,
  message: pt.string,
}

Popup.defaultProps = {
  Component: PopupContent,
  user: {},
  isOpen: false,
  handleSubmitForm: () => {},
  product: {},
  close: () => {},
  toCreate: true,
  message: '',
}

export default Popup
