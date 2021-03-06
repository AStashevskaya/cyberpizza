import React, { useMemo } from 'react'
import pt from 'prop-types'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'
import ErrorField from '../../ErrorFIeld'

import Input from '../../Input'
import { FILE_SIZE, IMAGES_FORMATES } from '../../../constants/'

import './Form.scss'

const schema = yup.object().shape({
  name: yup.string().required('Required'),
  description: yup.string().required('Required'),
  price: yup
    .number()
    .typeError('You should specify a number')
    .positive('You should specify a positive number')
    .required('Required'),
  enabled: yup.string().required('Required'),
  image: yup
    .mixed()
    .test('fileSize', 'File too large', (value) => {
      return value === null || (value && value.size <= FILE_SIZE) || typeof value === 'string'
    })
    .test('fileFormat', 'Unsupported file type', (value) => {
      return (
        value === null ||
        (value && IMAGES_FORMATES.includes(value.type)) ||
        typeof value === 'string'
      )
    }),
})

const ProductForm = ({ handleSubmitForm, toCreate, message, item }) => {
  const initialValues = useMemo(() => {
    const product = item
    const enabled = product.enabled ? product.enabled.join(', ') : ''

    return {
      name: product.name || '',
      price: product.price || '',
      image: product.image || '',
      description: product.description || '',
      enabled: enabled,
    }
  }, [item])

  return (
    <div className="form">
      {message}
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmitForm}>
        {({
          errors,
          isSubmitting,
          handleSubmit,
          validateForm,
          handleChange,
          values,
          touched,
          setFieldValue,
        }) => (
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
              name="price"
              id="price"
              placeholder="Price"
              value={values.price}
              handleChange={handleChange}
              error={touched.price ? errors.price : ''}
            />
            <Field
              component={Input}
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              value={values.description}
              handleChange={handleChange}
              error={touched.description ? errors.description : ''}
            />
            <Field
              component={Input}
              type="text"
              name="enabled"
              id="enabled"
              placeholder="Enabled"
              value={values.enabled}
              handleChange={handleChange}
              error={touched.enabled ? errors.enabled : ''}
            />
            <input
              type="file"
              id="image"
              name="image"
              onChange={(event) => setFieldValue('image', event.target.files[0])}
              error={touched.image ? errors.image : ''}
            />
            <ErrorField text={touched.image ? errors.image : ''} />
            <button type="submit" disabled={isSubmitting}>
              {toCreate ? 'Create' : 'Update'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

ProductForm.propTypes = {
  item: pt.object,
  handleSubmitForm: pt.func,
  toCreate: pt.bool,
  message: pt.string,
}

ProductForm.defaultProps = {
  item: {},
  handleSubmitForm: () => {},
  toCreate: true,
  message: '',
}

export default ProductForm
