import React, { useState, useCallback } from 'react'
import pt from 'prop-types'

import Popup from '../Popup'
import OrderForm from './Form/OrderFrom'

import { updateOrder, deleteOrder } from '../../api/admin'

import Card from './Item/Item'

const AdminOrders = ({ data, setData }) => {
  console.log(data)
  const [isOpen, setIsOpen] = useState(false)
  const [activeOrder, setActiveOrder] = useState({})
  const [formMessage, setFormMessage] = useState('')

  const updateItem = useCallback(
    (id) => {
      setIsOpen(true)
      setFormMessage('')
      const order = data.find((el) => el._id === id)
      console.log('order', order)
      setActiveOrder(order)
    },
    [data]
  )

  const deleteItem = useCallback(
    async (id) => {
      console.log(id, data)
      try {
        await deleteOrder(id)

        const newData = data.filter((item) => item._id.toString() !== id.toString())
        setData(newData)
      } catch (error) {
        console.log(error)
      }
    },
    [data, setData]
  )

  const handleSubmitForm = useCallback(
    async (values) => {
      let message, response
      console.log('values from submit', values)

      try {
        const { _id } = activeOrder

        response = await updateOrder(values, _id)
        console.log(response)
        message = 'Product is successfuly updated'
      } catch (error) {
        message = error.response.data.message
      } finally {
        setFormMessage(message)
      }
    },
    [activeOrder, data]
  )

  return (
    <div className="admin__wrapper">
      {data.map((el) => (
        <Card item={el} deleteItem={deleteItem} updateItem={updateItem} key={el._id.toString()} />
      ))}
      <Popup
        Component={OrderForm}
        handleSubmitForm={handleSubmitForm}
        user={activeOrder}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        message={formMessage}
      />
    </div>
  )
}

AdminOrders.propTypes = {
  data: pt.array,
}

AdminOrders.defaultProps = {
  data: [],
}

export default AdminOrders
