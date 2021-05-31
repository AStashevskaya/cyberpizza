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

  const createItem = useCallback(() => {
    setIsOpen(true)
    setToCreate(true)
    setActiveProduct({})
  }, [])

  const updateItem = useCallback(
    (id) => {
      setIsOpen(true)
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
      try {
        if (toCreate) {
          await createProduct(values)
        } else {
          const { _id } = activeProduct
          await updateProduct({ _id, values })
        }
        console.log('finally')
      } catch (error) {
        console.log(error)
      }
    },
    [toCreate, activeProduct]
  )

  console.log(handleSubmitForm)
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
