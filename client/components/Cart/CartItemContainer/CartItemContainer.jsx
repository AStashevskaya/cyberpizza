import React, { useCallback } from 'react'
import pt from 'prop-types'
import { useDispatch } from 'react-redux'
import { event } from 'react-ga'

import CartItem from '../CartItem/CartItem'
import { removeProduct } from '../../../redux/cart/actions'

const CartItemContainer = ({ product }) => {
  const { _id: id } = product
  const dispatch = useDispatch()

  const deleteProduct = useCallback(() => {
    dispatch(removeProduct(id))
    event({
      category: 'UPDATING CART',
      action: 'Deleted Product From Cart',
      label: `Product ${id} was deleted`,
    })
  }, [dispatch, id])

  return (
    <>
      <CartItem product={product} handleClick={deleteProduct} />
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
