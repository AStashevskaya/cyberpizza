import React from 'react'
import pt from 'prop-types'

import Card from '../Card'

const Cards = ({ cards, loading, cartId }) => {
  return (
    <div className="container_cards">
      {cards.map((el) => (
        <Card item={el} key={el._id} loading={loading} cartId={cartId} />
      ))}
    </div>
  )
}

Cards.propTypes = {
  cards: pt.array,
  loading: pt.bool,
  cartId: pt.string,
}

Cards.defaultProps = {
  cards: [],
  loading: true,
  cartId: null,
}

export default Cards
