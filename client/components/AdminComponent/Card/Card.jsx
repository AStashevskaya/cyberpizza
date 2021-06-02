import React, { useCallback, useMemo } from 'react'
import pt from 'prop-types'
// import { updateProduct, deleteProduct } from '../../../api/admin'

const Card = ({ item, updateItem }) => {
  const { name, _id: id } = item

  const deleteItem = useCallback(
    (e) => {
      console.log('name', name)
      deleteProduct(id)
    },
    [id]
  )
  return (
    <div className="admin__card">
      <div>{name}</div>
      <div>
        <button onClick={() => updateItem(id)}>update</button>
        <button onClick={deleteItem}>delete</button>
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
