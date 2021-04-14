import React from 'react'

import './Card.scss'

const Card = ({ item }) => {
  const { name, image, price, description } = item

  return (
    <div className="card">
      <div className="card__image">
        <img src={image} alt={name} />
        <button>+</button>
      </div>

      <div className="card__price">{`${price}$`}</div>
      <div className="card__title">{name}</div>
      <div className="card__description">{description}</div>
    </div>
  )
}

export default Card
