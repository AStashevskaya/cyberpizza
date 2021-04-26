import React from 'react'
import pt from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'

import { updateCartProducts, createCart } from '../../redux/cart/actions'
// import { createCart } from '../../api/cart'
import './Card.scss'

const Card = ({ item }) => {
  const { name, image, price, description, _id } = item

  const dispatch = useDispatch()
  const loading = useSelector((state) => state.cart.loading)
  const cartId = useSelector((state) => state.cart.id)

  const handleClick = (e, productId) => {
    e.preventDefault()

    if (loading) return

    if (cartId) {
      dispatch(updateCartProducts(productId))
    } else {
      dispatch(createCart(productId))
    }
  }

  return (
    <div className="card">
      <div className="card__image">
        <img src={image} alt={name} />
        <button onClick={(e) => handleClick(e, _id)}>+</button>
      </div>

      <div className="card__price">{`${price}$`}</div>
      <div className="card__title">{name}</div>
      <div className="card__description">{description}</div>
    </div>
  )
}

Card.propTypes = {
  item: pt.object,
}

export default Card
