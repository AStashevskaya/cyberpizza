import React, { useCallback } from 'react'
// import pt from 'prop-types'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import Input from '../Input'
import { loginUser } from '../../api/user'
import './Login.scss'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
})

const initValues = {
  email: '',
  password: '',
}

const Login = () => {
  const handleFormSubmit = useCallback((values) => {
    console.log(values)

    try {
      loginUser(values)
      document.location.replace('/')
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <div className="login">
      <Formik initialValues={initValues} validationSchema={schema} onSubmit={handleFormSubmit}>
        {({ errors, touched, isSubmitting, handleSubmit, validateForm, handleChange, values }) => (
          <Form
            onKeyPress={(keyEvent) => {
              console.log(touched)
              if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
                keyEvent.preventDefault()
                validateForm()
                handleSubmit()
              }
            }}
          >
            <Field
              component={Input}
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              error={touched.email ? errors.email : ''}
              handleChange={handleChange}
            />
            <Field
              component={Input}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              error={touched.password ? errors.password : ''}
              value={values.password}
              handleChange={handleChange}
            />
            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login
