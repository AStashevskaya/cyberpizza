import React from 'react'
import pt from 'prop-types'
import { useSelector } from 'react-redux'

import Cards from './Cards'

const CardsContainer = ({ cards }) => {
  const loading = useSelector((state) => state.cart.loading)
  const cartId = useSelector((state) => state.cart.id)

  return (
    <div>
      <Cards loading={loading} cartId={cartId} cards={cards} />
    </div>
  )
}

CardsContainer.propTypes = {
  cards: pt.array,
}

CardsContainer.defaultProps = {
  cards: [],
}

export default CardsContainer
