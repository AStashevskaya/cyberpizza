import React, { useState } from 'react'
import pt from 'prop-types'

import './Input.scss'

const Input = ({ placeholder, value, handleChange, type, name, id }) => {
  // const [value, setValue] = useState(value)
  // const handleChange = (e) => {
  // console.log(e.target.value)
  // setValue(e.target.value)
  // }
  console.log(handleChange, value, name)

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
    </div>
  )
}

Input.propTypes = {
  placeholder: pt.string,
  value: pt.string,
  name: pt.string,
  id: pt.string,
  type: pt.string,
  handleChange: pt.func,
}

Input.defaultProps = {
  placeholder: '',
  value: '',
  name: '',
  id: '',
  type: '',
  handleChange: () => {},
}

export default Input
