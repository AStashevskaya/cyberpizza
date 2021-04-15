import React from 'react'
import pt from 'prop-types'

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

Cards.propTypes = {
  cards: pt.array,
}

Cards.defaultProps = {
  cards: [],
}

export default Cards
