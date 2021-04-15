import React from 'react'

import Card from '../Card'

const Cards = ({ cards }) => {
  return (
    <div className="container_cards">
      {cards.map((el) => (
        <Card item={el} key={el._id} />
      ))}
    </div>
  )
}

export default Cards
