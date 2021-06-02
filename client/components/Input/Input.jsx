import React from 'react'
import pt from 'prop-types'

import ErrorField from '../ErrorFIeld'

import './Input.scss'

const Input = ({ placeholder, value, handleChange, type, name, id, error }) => {
  return (
    <div className="input_row">
      <input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        type={type}
        name={name}
        id={id}
      />
      {error ? <ErrorField text={error} /> : ''}
    </div>
  )
}

Input.propTypes = {
  error: pt.string,
  placeholder: pt.string,
  value: pt.string,
  name: pt.string,
  id: pt.string,
  type: pt.string,
  handleChange: pt.func,
}

Input.defaultProps = {
  error: '',
  placeholder: '',
  value: '',
  name: '',
  id: '',
  type: '',
  handleChange: () => {},
}

export default Input
