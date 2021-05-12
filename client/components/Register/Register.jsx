import React, { useCallback } from 'react'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import Input from '../Input'
import { createUser } from '../../api/user'

import './Register.scss'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
  name: yup.string().required('Required'),
})

const initValues = {
  email: '',
  password: '',
  name: '',
}

const Register = () => {
  const handleFormSubmit = useCallback(async (values) => {
    console.log(values.password)
    createUser(values)
  }, [])

  return (
    <div className="register">
      <Formik initialValues={initValues} validationSchema={schema} onSubmit={handleFormSubmit}>
        {({ errors, isSubmitting, handleSubmit, validateForm, handleChange, values, touched }) => (
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
              name="name"
              id="name"
              placeholder="Name"
              value={values.name}
              handleChange={handleChange}
              error={touched.name ? errors.name : ''}
            />
            <Field
              component={Input}
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              value={values.email}
              handleChange={handleChange}
              error={touched.email ? errors.email : ''}
            />
            <Field
              component={Input}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={values.password}
              handleChange={handleChange}
              error={touched.password ? errors.password : ''}
            />
            <button type="submit" disabled={isSubmitting}>
              Sign in
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Register
