import React, { useCallback, useState } from 'react'
import pt from 'prop-types'
import Popup from '../Popup'
import ProductForm from './Form/ProductForm'

import Card from './Card/Card'
import { updateProduct, createProduct, deleteProduct } from '../../api/admin'

const AdminProducts = ({ data, setData }) => {
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

  const deleteItem = useCallback(
    async (id) => {
      console.log(id, data)
      try {
        await deleteProduct(id)

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
      let formData = new FormData()
      let message, response

      try {
        if (toCreate) {
          for (let key in values) {
            formData.set(key, values[key])

            if (key === 'image') {
              formData.set(key, values[key], values.image.name)
            }
          }

          response = await createProduct(formData)

          const product = response.data.product
          message = response.data.message

          setData([...data, product])
        } else {
          const { _id } = activeProduct

          for (let key in values) {
            if (activeProduct[key] !== values[key] && key !== 'enabled') {
              formData.set(key, values[key])

              if (key === 'image') {
                formData.set(key, values[key], values.image.name)
              }
            }
          }

          formData.append('_id', _id)
          formData.append('enabled', values.enabled)

          response = await updateProduct(formData, _id)
          message = 'Product is successfuly updated'
        }
      } catch (error) {
        message = error.response.data.message
      } finally {
        setFormMessage(message)
      }
    },
    [toCreate, activeProduct, data]
  )

  return (
    <div className="admin__wrapper">
      <button onClick={createItem}>create item</button>
      {data.length !== 0
        ? data.map((el) => (
            <Card
              item={el}
              deleteItem={deleteItem}
              updateItem={updateItem}
              key={el._id.toString()}
            />
          ))
        : ''}
      <Popup
        Component={ProductForm}
        handleSubmitForm={handleSubmitForm}
        product={activeProduct}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toCreate={toCreate}
        message={formMessage}
      />
    </div>
  )
}

AdminProducts.propTypes = {
  data: pt.array,
  setData: pt.func,
}

AdminProducts.defaultProps = {
  data: [],
  setData: () => {},
}

export default AdminProducts
