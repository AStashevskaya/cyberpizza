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
        {({ errors, isSubmitting, handleSubmit, validateForm, handleChange, values }) => (
          <Form>
            <Field
              component={Input}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={values.name}
              handleChange={handleChange}
            />
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
              Sign in
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Register