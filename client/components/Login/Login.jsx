import React, { useCallback } from 'react'
// import pt from 'prop-types'
import { useHistory } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'

import Input from '../Input'
import ErrorField from '../ErrorFIeld'
import { login } from '../../redux/user'
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
  const dispatch = useDispatch()
  const history = useHistory()
  const error = useSelector((state) => state.user.error)

  const handleFormSubmit = useCallback(
    (values) => {
      dispatch(login(values))
    },
    [dispatch]
  )

  return (
    <div className="login">
      {error ? <ErrorField text={error} /> : ''}
      <Formik initialValues={initValues} validationSchema={schema} onSubmit={handleFormSubmit}>
        {({ errors, touched, isSubmitting, handleSubmit, validateForm, handleChange, values }) => (
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
            <button type="submit" disabled={!error && isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login
