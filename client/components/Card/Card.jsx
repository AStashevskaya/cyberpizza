import React from 'react'
import pt from 'prop-types'

import { createCart, getCart } from '../../api/cart'
import './Card.scss'

const Card = ({ item }) => {
  const { name, image, price, description, _id } = item

  const getcartData = async () => {
    const newCart = await getCart()
  }

  const handleClick = (id) => {
    console.log(id)

    async function getcartData() {
      const newCart = await getCart()
      console.log(newCart)
    }
    getcartData()
    
  }

  return (
    <div className="card">
      <div className="card__image">
        <img src={image} alt={name} />
        <button onClick={handleClick}>+</button>
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
