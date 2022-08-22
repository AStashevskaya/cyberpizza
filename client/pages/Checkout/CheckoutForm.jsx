import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import Input from '../../components/Input'
import ErrorField from '../../components/ErrorFIeld'
import { signIn } from '../../redux/user'

const schema = yup.object().shape({
  name: yup.string().required('Required'),
  email: yup.string().email('Invalid email').required('Required'),
  shipping: yup.string().required('Required'),
  city: yup.string().required('Required'),
  address: yup.string().required('Required'),
  mobile: yup.string().required('Required'),
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

  const handleFormSubmit = useCallback(
    async (values) => {
      console.log('values', values)
      //   dispatch(signIn(values))
    },
    [dispatch]
  )

  console.log('checkout props', props)
  console.log('checkout children', props.children)

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
            name="mobile"
            id="mobile"
            placeholder="mobile"
            value={values.mobile}
            handleChange={handleChange}
            error={touched.mobile ? errors.mobile : ''}
          />
          <button type="submit" disabled={isSubmitting}>
            submit
          </button>
          {props.children && props.children.map((element) => element)}
        </Form>
      )}
    </Formik>
  )
}

export default Checkout
