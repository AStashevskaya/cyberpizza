import React, { useCallback } from 'react'
// import pt from 'prop-types'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import Input from '../Input'
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
  }, [])

  return (
    <div className="login">
      <Formik initialValues={initValues} validationSchema={schema} onSubmit={handleFormSubmit}>
        {({
          errors,
          touched,
          isSubmitting,
          handleSubmit,
          validateForm,
          handleChange,
          initialValues,
          values,
        }) => (
          <Form
            onKeyPress={async (keyEvent) => {
              console.log('isSubmitting', isSubmitting)
              console.log('errors', errors)
              console.log(initialValues, values)
              if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
                keyEvent.preventDefault()
                await validateForm()
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
              handleChange={handleChange}
            />
            <Field
              component={Input}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
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
