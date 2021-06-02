import React, { useCallback, useState } from 'react'
import pt from 'prop-types'
import Popup from '../Popup'
import ProductForm from './Form/ProductForm'

import Card from './Card/Card'
import { updateProduct, createProduct } from '../../api/admin'

const AdminProducts = ({ data, deleteItem }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [toCreate, setToCreate] = useState(true)
  const [activeProduct, setActiveProduct] = useState({})
  const [formMessage, setFormMessage] = useState('')

  const createItem = useCallback(() => {
    setIsOpen(true)
    setFormMessage('')
    setToCreate(true)
    setActiveProduct({})
  }, [])

  const updateItem = useCallback(
    (id) => {
      setIsOpen(true)
      setFormMessage('')
      setToCreate(false)
      const product = data.find((el) => el._id === id)
      setActiveProduct(product)
    },
    [data]
  )

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleSubmitForm = useCallback(
    async (values) => {
      let data = new FormData()
      let message, response
      console.log(values)

      try {
        if (toCreate) {
          for (let key in values) {
            data.set(key, values[key])

            if (key === 'image') {
              data.set(key, values[key], values.image.name)
            }
          }

          response = await createProduct(data)
        } else {
          const { _id } = activeProduct

          for (let key in values) {
            if (activeProduct[key] !== values[key] && key !== 'enabled') {
              data.set(key, values[key])
              console.log(key)

              if (key === 'image') {
                data.set(key, values[key], values.image.name)
              }
            }
          }

          data.append('_id', _id)
          data.append('enabled', values.enabled)

          response = await updateProduct(data, _id)
        }
        message = response.data.message
      } catch (error) {
        message = error.response.data.message
      } finally {
        setFormMessage(message)
      }
    },
    [toCreate, activeProduct]
  )

  return (
    <div className="admin__wrapper">
      <button onClick={createItem}>create item</button>
      {data.map((el) => (
        <Card item={el} deleteItem={deleteItem} updateItem={updateItem} key={el._id.toString()} />
      ))}
      <Popup
        Component={ProductForm}
        handleSubmitForm={handleSubmitForm}
        product={activeProduct}
        isOpen={isOpen}
        handleClose={handleClose}
        toCreate={toCreate}
        message={formMessage}
      />
    </div>
  )
}

AdminProducts.propTypes = {
  data: pt.array,
  deleteItem: pt.func,
}

AdminProducts.defaultProps = {
  data: [],
}

export default AdminProducts
