import React, { useCallback } from 'react'
import pt from 'prop-types'

import { useDispatch } from 'react-redux'

import { updateCartProducts, createCart } from '../../redux/cart/actions'

import './Card.scss'

const Card = ({ item, loading, cartId }) => {
  const { name, image, price, description, _id } = item

  const dispatch = useDispatch()

  const handleClick = useCallback(
    (e) => {
      e.preventDefault()

      if (loading) return

      if (cartId) {
        dispatch(updateCartProducts(_id))
      } else {
        dispatch(createCart(_id))
      }
    },
    [dispatch, cartId, loading, _id]
  )

  return (
    <div className="card">
      <div className="card__image">
        <img src={image} alt={name} />
        <button
          onClick={handleClick}
          className={loading ? 'card__button disabled' : 'card__button'}
        >
          +
        </button>
      </div>

      <div className="card__price">{`${price}$`}</div>
      <div className="card__title">{name}</div>
      <div className="card__description">{description}</div>
    </div>
  )
}

Card.propTypes = {
  item: pt.object,
  loading: pt.bool,
  cartId: pt.string,
}

export default Card
