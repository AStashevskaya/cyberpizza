import React, { useMemo } from 'react'
import pt from 'prop-types'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import './Form.scss'

const schema = yup.object().shape({
  status: yup.string().required('Required'),
})

const OrderForm = ({ handleSubmitForm, item, message }) => {
  const initialValues = useMemo(() => {
    return {
      status: item.status,
    }
  }, [item])

  return (
    <div className="form">
      <div className="form__message">{message}</div>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmitForm}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="form__row">
              <span>Order status:</span>
              <div className="form__radio-group">
                <label htmlFor="status">
                  <Field
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
  item: pt.object,
  handleSubmitForm: pt.func,
  message: pt.string,
}

OrderForm.defaultProps = {
  item: {},
  handleSubmitForm: () => {},
  message: '',
}

export default OrderForm
