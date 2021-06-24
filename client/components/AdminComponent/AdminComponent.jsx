import React, { useEffect, useState, useCallback } from 'react'
import pt from 'prop-types'

import Popup from '../Popup'
import ProductForm from './Form/ProductForm'

import Card from './Item/Item'
import {
  updateProduct,
  createProduct,
  getData,
  updateAdminDataItem,
  deleteAdminDataItem,
} from '../../api/admin'
import './AdminComponent.scss'

const AdminComponent = ({ title, Form }) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const [isOpen, setIsOpen] = useState(false)
  const [toCreate, setToCreate] = useState(true)
  const [activeAdminDataItem, setactiveAdminDataItem] = useState({})
  const [formMessage, setFormMessage] = useState('')

  const getNewData = useCallback(async () => {
    setLoading(true)
    setData([])

    const response = await getData(title)

    if (response && response.data) {
      setData([...response.data])
      setLoading(false)
    }
  }, [title])

  useEffect(() => {
    getNewData()
  }, [getNewData])

  const createItem = useCallback(() => {
    setIsOpen(true)
    setFormMessage('')
    setToCreate(true)
    setactiveAdminDataItem({})
  }, [])

  const updateItem = useCallback(
    (id) => {
      setIsOpen(true)
      setFormMessage('')
      setToCreate(false)

      const product = data.find((el) => el._id === id)
      setactiveAdminDataItem(product)
    },
    [data]
  )

  const deleteItem = useCallback(
    async (id) => {
      try {
        await deleteAdminDataItem(title, id)

        const newData = data.filter((item) => item._id.toString() !== id.toString())
        setData(newData)
      } catch (error) {
        console.log(error)
      }
    },
    [data, setData, title]
  )

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

          const { product } = response.data
 
          message = response.data.message

          setData([...data, product])
        } else {
          const { _id } = activeAdminDataItem

          if (title === 'products') {
            for (let key in values) {
              if (activeAdminDataItem[key] !== values[key] && key !== 'enabled') {
                formData.set(key, values[key])

                if (key === 'image') {
                  formData.set(key, values[key], values.image.name)
                }
              }
            }

            formData.append('_id', _id)
            formData.append('enabled', values.enabled)

            response = await updateProduct(formData, _id)
            const enabled = values.enabled ? values.enabled.split(',').map((el) => el.trim()) : []

            const updatedData = data.map((item) =>
              item._id === activeAdminDataItem._id ? { ...item, ...values, enabled } : item
            )

            setData(updatedData)
          } else {
            response = await updateAdminDataItem(title, values, _id)

            const updatedData = data.map((item) =>
              item._id === activeAdminDataItem._id ? { ...item, ...values } : item
            )
            setData(updatedData)
          }
          const itemName = title.slice(0, -1)

          message = `${itemName} is successfuly updated`
        }
      } catch (error) {
        message = error.response.data.message
      } finally {
        setFormMessage(message)
      }
    },
    [toCreate, activeAdminDataItem, data, title]
  )

  return (
    <div className="container_admin">
      {loading ? (
        <div className="loading">loading</div>
      ) : (
        <div className="admin__wrapper">
          {title === 'products' ? <button onClick={createItem}>create item</button> : ''}
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
            Component={Form}
            handleSubmitForm={handleSubmitForm}
            item={activeAdminDataItem}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            toCreate={toCreate}
            message={formMessage}
          />
        </div>
      )}
    </div>
  )
}

AdminComponent.propTypes = {
  title: pt.string,
  Form: pt.func,
}

AdminComponent.defaultProps = {
  title: 'products',
  Form: ProductForm,
}
export default AdminComponent
