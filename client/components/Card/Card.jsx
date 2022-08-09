import React, { useCallback } from 'react'
import pt from 'prop-types'

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { updateCartProducts, createCart } from '../../redux/cart/actions'

import './Card.scss'

const Card = ({ item, loading, cartId, product, name, price, description }) => {
  // const { name, image, price, description, _id } = item
  const currentProduct = product || item || {}

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
      <Link to={`/product/${currentProduct.name || name}`}>
        <div className="card__image">
          <img src={currentProduct.image} alt={currentProduct.name || name} />
          <button
            onClick={handleClick}
            className={loading ? 'card__button disabled' : 'card__button'}
          >
            +
          </button>
        </div>

        <div className="card__price">{`${currentProduct.price || price}$`}</div>
        <div className="card__title">{currentProduct.name || name}</div>
        <div className="card__description">{currentProduct.description || description}</div>
      </Link>
    </div>
  )
}

Card.propTypes = {
  item: pt.object,
  loading: pt.bool,
  cartId: pt.string,
  name: pt.string,
  description: pt.string,
  image: pt.string,
  price: pt.string,
  product: pt.object,
}

export default Card
