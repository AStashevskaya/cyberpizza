import React from 'react'
import pt from 'prop-types'

import { useSelector, useDispatch } from 'react-redux'

// import { createCart, getCart, addToCart } from '../../api/cart'
import { updateCartProducts } from '../../redux/cart/actions'
import './Card.scss'

const Card = ({ item }) => {
  const { name, image, price, description, _id } = item
  const dispatch = useDispatch()

  // const products = useSelector(state => state.cart.products)

  const handleClick = (e, id) => {
    e.preventDefault()
    console.log(id)
    dispatch(updateCartProducts(id))
    // async function getData() {
    //   const { data } = await getCart('607ffefed115ba028025cf9b')
    //   console.log(data)
    // }

    // getData()
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
