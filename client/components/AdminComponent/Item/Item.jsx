import React from 'react'
import pt from 'prop-types'

const Card = ({ item, updateItem, deleteItem }) => {
  const { name, _id: id, createdAt, status } = item

  const date = createdAt ? new Date(createdAt).toLocaleString() : null

  return (
    <div className="admin__card">
      <div>{name || `${date}: ${status}`}</div>
      <div>
        <button onClick={() => updateItem(id)}>update</button>
        <button onClick={() => deleteItem(id)}>delete</button>
      </div>
    </div>
  )
}

Card.propTypes = {
  item: pt.object,
  deleteItem: pt.func,
  updateItem: pt.func,
}

export default Card
