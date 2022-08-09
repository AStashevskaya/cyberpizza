import React, { useCallback } from 'react'
import pt from 'prop-types'
import { useDispatch } from 'react-redux'

import CartItem from '../CartItem/CartItem'
import { removeProduct } from '../../../redux/cart/actions'

const CartItemContainer = ({ product, removeItem }) => {
  const { _id: id } = product
  const dispatch = useDispatch()

  const deleteProduct = useCallback(() => {
    dispatch(removeProduct(id))
  }, [dispatch, id])

  return (
    <>
      <CartItem product={product} handleClick={deleteProduct} removeItem={removeItem} />
    </>
  )
}

CartItemContainer.propTypes = {
  product: pt.object,
}

CartItemContainer.defaultProps = {
  product: {},
}

export default CartItemContainer
