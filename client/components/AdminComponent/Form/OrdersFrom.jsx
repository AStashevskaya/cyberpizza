import React, { useMemo } from 'react'
import pt from 'prop-types'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'

const schema = yup.object().shape({
  status: yup.string().required('Required'),
})

const OrderForm = ({ handleSubmitForm, user, toCreate, message }) => {
  const initialValues = useMemo(() => {
    console.log(user)
    return {
      status: user.status,
    }
  }, [user])
  console.log(initialValues)

  return (
    <div className="form_product">
      <div className="form__message">{message}</div>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmitForm}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="row">
              <label htmlFor="status">
                <Field
                  // component={Input}
                  type="radio"
                  name="status"
                  value="cooking"
                  onChange={(value) => setFieldValue('status', 'cooking')}
                  checked={values.status === 'cooking'}
                />
                cooking
              </label>
              <label htmlFor="status">
                <Field
                  type="radio"
                  name="status"
                  value="canceled"
                  onChange={(value) => setFieldValue('status', 'canceled')}
                  checked={values.status === 'canceled'}
                />
                canceled
              </label>
              <label htmlFor="status">
                <Field
                  type="radio"
                  name="status"
                  value="delivered"
                  onChange={(value) => setFieldValue('status', 'delivered')}
                  checked={values.status === 'delivered'}
                />
                delivered
              </label>
            </div>
            <button type="submit" disabled={isSubmitting}>
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

OrderForm.propTypes = {
  order: pt.object,
  handleSubmitForm: pt.func,
  toCreate: pt.bool,
  message: pt.string,
}

OrderForm.defaultProps = {
  order: {},
  handleSubmitForm: () => {},
  toCreate: true,
  message: '',
}

export default OrderForm
