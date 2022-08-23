import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import Input from '../../components/Input'
import ErrorField from '../../components/ErrorFIeld'
import { signIn } from '../../redux/user'
import './checkout.scss'

const schema = yup.object().shape({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  shipping: yup.string().required('Required'),
  city: yup.string().required('Required'),
  address: yup.string().required('Required'),
  mobile: yup
    .string()
    .required('Required')
    .test('number', 'Unsupported mobile number', (value) => {
      // console.log(value.trim().match(/[^ ([0 - 9] * $)]/))
      let tel = value && value.startsWith('+') ? value.slice(1, -1) : value
      tel = tel && tel.split('-').join('')
      tel = Number(tel)
      return !isNaN(tel)
    }),
})

const initValues = {
  name: '',
  email: '',
  shipping: '',
  city: '',
  address: '',
  mobile: '',
}

const Checkout = (props) => {
  const dispatch = useDispatch()

  const handleFormSubmit = useCallback(async (values) => {
    console.log('values', values)
    //   dispatch(signIn(values))
  }, [])

  return (
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
            type="text"
            name="shipping"
            id="shipping"
            placeholder="shipping"
            value={values.shipping}
            handleChange={handleChange}
            error={touched.shipping ? errors.shipping : ''}
          />
          <Field
            component={Input}
            type="text"
            name="city"
            id="city"
            placeholder="city"
            value={values.city}
            handleChange={handleChange}
            error={touched.city ? errors.city : ''}
          />
          <Field
            component={Input}
            type="text"
            name="address"
            id="address"
            placeholder="address"
            value={values.address}
            handleChange={handleChange}
            error={touched.address ? errors.address : ''}
          />
          <Field
            component={Input}
            type="text"
            name="mobile"
            id="mobile"
            placeholder="mobile"
            value={values.mobile}
            handleChange={handleChange}
            error={touched.mobile ? errors.mobile : ''}
          />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default Checkout
