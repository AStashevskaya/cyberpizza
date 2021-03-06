import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import Input from '../Input'
import ErrorField from '../ErrorFIeld'
import { signIn } from '../../redux/user'

import './Register.scss'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().required('Required'),
  confirmedPassword: yup.string().test('passwords-match', 'Passwords must match', function (value) {
    return this.parent.password === value
  }),
  name: yup.string().required('Required'),
})

const initValues = {
  email: '',
  password: '',
  confirmedPassword: '',
  name: '',
}

const Register = () => {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.user.error)

  const handleFormSubmit = useCallback(
    async (values) => {
      dispatch(signIn(values))
    },
    [dispatch]
  )

  return (
    <div className="register">
      {error ? <ErrorField text={error} /> : ''}
      <Formik initialValues={initValues} validationSchema={schema} onSubmit={handleFormSubmit}>
        {({ errors, isSubmitting, handleSubmit, validateForm, handleChange, values, touched }) => (
          <Form
            onKeyPress={(keyEvent) => {
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
            <Field
              component={Input}
              type="password"
              name="confirmedPassword"
              id="confirmedPassword"
              placeholder="Confirm your password"
              value={values.confirmedPassword}
              handleChange={handleChange}
              error={touched.confirmedPassword ? errors.confirmedPassword : ''}
            />
            <button type="submit" disabled={isSubmitting}>
              Sign up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Register
