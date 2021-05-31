import React, { useMemo } from 'react'
import pt from 'prop-types'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import Input from '../../Input'
import ErrorField from '../../ErrorFIeld'

const schema = yup.object().shape({
  name: yup.string().required('Required'),
  description: yup.string().required('Required'),
  price: yup.string().required('Required'),
  enabled: yup.string().required('Required'),
})

const ProductForm = ({ handleSubmitForm, product, toCreate }) => {
  const initialValues = useMemo(() => {
    return {
      name: product.name || '',
      price: product.price || '',
      description: product.description || '',
      enabled: product.enabled ? product.enabled.join(', ') : '',
    }
  }, [product])
  console.log(handleSubmitForm)

  return (
    <div className="form_product">
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmitForm}>
        {({ errors, isSubmitting, handleSubmit, validateForm, handleChange, values, touched }) => (
          <Form
            onKeyPress={(keyEvent) => {
                console.log(errors)
              if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
                  console.log(errors)
                keyEvent.preventDefault()
                validateForm()
                handleSubmit(product._id)
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
              type="text"
              name="enabled"
              id="name"
              placeholder="Name"
              value={values.enabled}
              handleChange={handleChange}
              error={touched.enabled ? errors.enabled : ''}
            />

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
  product: pt.object,
  handleSubmitForm: pt.func,
}

ProductForm.defaultProps = {
  product: {},
  handleSubmitForm: () => {},
}

export default ProductForm
