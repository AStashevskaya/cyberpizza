import React, { useMemo } from 'react'
import pt from 'prop-types'
import { Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import Input from '../../Input'

import { FILE_SIZE, IMAGES_FORMATES } from '../../../constants/'

const schema = yup.object().shape({
  isActive: yup.bool().required('Required'),
  isAdmin: yup.bool().required('Required'),
})

const UserForm = ({ handleSubmitForm, user, toCreate, message }) => {
  const initialValues = useMemo(() => {
    console.log(user)
    return {
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    }
  }, [user])
  console.log(initialValues)

  return (
    <div className="form_product">
      <div className="form__message">{message}</div>
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
                console.log(errors)
                keyEvent.preventDefault()
                validateForm()
                handleSubmit()
              }
            }}
          >
            {/* <Field
              component={Input}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              value={values.name}
              handleChange={handleChange}
              error={touched.name ? errors.name : ''}
            /> */}
            <div className="row">
              <label>
                <Field
                  // component={Input}
                  type="radio"
                  name="isAdmin"
                  id="isAdmin"
                  value={values.isAdmin}
                  onChange={(value) => setFieldValue('isAdmin', true)}
                  checked={values.isAdmin}
                  // error={touched.price ? errors.price : ''}
                />
                admin
              </label>
              <label>
                <Field
                  // component={Input}
                  type="radio"
                  name="isAdmin"
                  id="isAdmin"
                  value={!values.isAdmin}
                  onChange={(value) => setFieldValue('isAdmin', false)}
                  checked={!values.isAdmin}
                  // error={touched.price ? errors.price : ''}
                />
                user
              </label>
            </div>
            <div className="row">
              <label>
                <Field
                  // component={Input}
                  type="radio"
                  name="isActive"
                  id="isActive"
                  value={values.isActive}
                  onChange={(value) => setFieldValue('isActive', true)}
                  checked={values.isActive}
                  // error={touched.price ? errors.price : ''}
                />
                active
              </label>
              <label>
                <Field
                  // component={Input}
                  type="radio"
                  name="isActive"
                  id="isActive"
                  value={!values.isActive}
                  onChange={(value) => setFieldValue('isActive', false)}
                  checked={!values.isActive}
                  // error={touched.price ? errors.price : ''}
                />
                inactive
              </label>
            </div>
            <button type="submit" disabled={isSubmitting}>
              {toCreate ? 'Create' : 'Update'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

UserForm.propTypes = {
  user: pt.object,
  handleSubmitForm: pt.func,
  toCreate: pt.bool,
  message: pt.string,
}

UserForm.defaultProps = {
  user: {},
  handleSubmitForm: () => {},
  toCreate: true,
  message: '',
}

export default UserForm
