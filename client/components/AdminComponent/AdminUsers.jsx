import React, { useState, useCallback } from 'react'
import pt from 'prop-types'
import Card from './Item/Item'
import Popup from '../Popup'
import { updateUser, deleteUser } from '../../api/admin'
import UserForm from './Form/UserForm'

const AdminUsers = ({ data, setData }) => {
  console.log(data)
  const [isOpen, setIsOpen] = useState(false)
  const [toCreate, setToCreate] = useState(true)
  const [activeUser, setActiveUser] = useState({})
  const [formMessage, setFormMessage] = useState('')

  // const createItem = useCallback(() => {
  //   setIsOpen(true)
  //   setFormMessage('')
  //   setToCreate(true)
  //   setactiveAdminDataItem({})
  // }, [])

  const updateItem = useCallback(
    (id) => {
      setIsOpen(true)
      setFormMessage('')
      setToCreate(false)
      const user = data.find((el) => el._id === id)
      setActiveUser(user)
    },
    [data]
  )

  const deleteItem = useCallback(
    async (id) => {
      console.log(id, data)
      try {
        await deleteUser(id)

        const newData = data.filter((item) => item._id.toString() !== id.toString())
        setData(newData)
      } catch (error) {
        console.log(error)
      }
    },
    [data, setData]
  )

  // const handleClose = useCallback(() => {
  //   setIsOpen(false)
  // }, [])

  const handleSubmitForm = useCallback(
    async (values) => {
      let message, response
      console.log('values from submit', values)

      try {
        const { _id } = activeUser

        response = await updateUser(values, _id)
        console.log(response)
        message = 'Product is successfuly updated'
      } catch (error) {
        message = error.response.data.message
      } finally {
        setFormMessage(message)
      }
      // let formData = new FormData()
      // let message, response

      // try {
      //   if (toCreate) {
      //     for (let key in values) {
      //       formData.set(key, values[key])

      //       if (key === 'image') {
      //         formData.set(key, values[key], values.image.name)
      //       }
      //     }

      //     response = await createProduct(formData)

      //     const product = response.data.product
      //     message = response.data.message

      //     setData([...data, product])
      //   } else {
      //     const { _id } = activeUser

      //     for (let key in values) {
      //       if (activeUser[key] !== values[key] && key !== 'enabled') {
      //         formData.set(key, values[key])

      //         if (key === 'image') {
      //           formData.set(key, values[key], values.image.name)
      //         }
      //       }
      //     }

      //     formData.append('_id', _id)
      //     formData.append('enabled', values.enabled)

      //     response = await updateProduct(formData, _id)
      //     message = 'Product is successfuly updated'
      //   }
      // } catch (error) {
      //   message = error.response.data.message
      // } finally {
      //   setFormMessage(message)
      // }
    },
    [toCreate, activeUser, data]
  )
  return (
    <div className="admin__wrapper">
      {data.map((el) => (
        <Card item={el} deleteItem={deleteItem} updateItem={updateItem} key={el._id.toString()} />
      ))}
      <Popup
        Component={UserForm}
        product={activeUser}
        handleSubmitForm={handleSubmitForm}
        user={activeUser}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toCreate={toCreate}
        message={formMessage}
      />
    </div>
  )
}

AdminUsers.propTypes = {
  data: pt.array,
}

AdminUsers.defaultProps = {
  data: [],
}

export default AdminUsers
