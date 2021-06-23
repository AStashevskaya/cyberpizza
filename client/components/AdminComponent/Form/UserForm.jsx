import React, { useMemo } from 'react'
import pt from 'prop-types'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import './Form.scss'

const schema = yup.object().shape({
  isActive: yup.bool().required('Required'),
  isAdmin: yup.bool().required('Required'),
})

const UserForm = ({ handleSubmitForm, message, item }) => {
  const initialValues = useMemo(() => {
    const user = item

    return {
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    }
  }, [item])

  return (
    <div className="form">
      <div className="form__message">{message}</div>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmitForm}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <div className="form__row">
              <span>ROLE:</span>
              <div className="form__radio-group">
                <label htmlFor="isAdmin">
                  <Field
                    type="radio"
                    name="isAdmin"
                    value={values.isAdmin}
                    onChange={(value) => setFieldValue('isAdmin', true)}
                    checked={values.isAdmin}
                  />
                  Admin
                </label>
                <label htmlFor="isAdmin">
                  <Field
                    type="radio"
                    name="isAdmin"
                    value={!values.isAdmin}
                    onChange={(value) => setFieldValue('isAdmin', false)}
                    checked={!values.isAdmin}
                  />
                  User
                </label>
              </div>
            </div>
            <div className="form__row">
              <span>ACTIVE:</span>
              <div className="form__radio-group">
                <label htmlFor="isActive">
                  <Field
                    type="radio"
                    name="isActive"
                    value={values.isActive}
                    onChange={(value) => setFieldValue('isActive', true)}
                    checked={values.isActive}
                  />
                  Active
                </label>
                <label htmlFor="isActive">
                  <Field
                    type="radio"
                    name="isActive"
                    value={!values.isActive}
                    onChange={(value) => setFieldValue('isActive', false)}
                    checked={!values.isActive}
                  />
                  Inactive
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

UserForm.propTypes = {
  item: pt.object,
  handleSubmitForm: pt.func,
  message: pt.string,
}

UserForm.defaultProps = {
  item: {},
  handleSubmitForm: () => {},
  toCreate: true,
  message: '',
}

export default UserForm
