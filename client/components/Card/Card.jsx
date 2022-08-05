import React, { useCallback } from 'react'
import pt from 'prop-types'

import { useDispatch } from 'react-redux'

import { updateCartProducts, createCart } from '../../redux/cart/actions'

import './Card.scss'

const Card = ({ item, loading, cartId, product }) => {
  // const { name, image, price, description, _id } = item
  const currentProduct = product || item
  console.log('product', product)

  const dispatch = useDispatch()

  const handleClick = useCallback(
    (e) => {
      e.preventDefault()

      if (loading) {
        return
      }

      if (cartId) {
        dispatch(updateCartProducts(currentProduct._id))
      } else {
        dispatch(createCart(currentProduct._id))
      }
    },
    [dispatch, cartId, loading, currentProduct._id]
  )

  return (
    <div className="card">
      <div className="card__image">
        <img src={currentProduct.image} alt={currentProduct.name} />
        <button
          onClick={handleClick}
          className={loading ? 'card__button disabled' : 'card__button'}
        >
          +
        </button>
      </div>

      <div className="card__price">{`${currentProduct.price}$`}</div>
      <div className="card__title">{currentProduct.name}</div>
      <div className="card__description">{currentProduct.description}</div>
    </div>
  )
}

Card.propTypes = {
  item: pt.object,
  loading: pt.bool,
  cartId: pt.string,
}

export default Card
