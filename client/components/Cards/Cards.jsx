import React from 'react'

import Card from '../Card'

const Cards = () => {
  const cards = [
    {
      id: '1',
      name: 'Pepperoni',
      image: '/files/pepperoni.png',
      price: '12BYN',
      description: 'Pizza with pepperoni. No vegetarian. Pizza with pepperoni. No vegetarian.',
      enabled: ['mozzarella', 'pepperoni'],
    },
    {
      id: '2',
      name: '4 cheese',
      image: '/files/4-cheese.png',
      price: '14BYN',
      description: 'Cheesy pizza.Vegetarian. Cheesy pizza.Vegetaria. Cheesy pizza.Vegetaria.',
      enabled: ['mozzarella', 'blue cheese'],
    },
    {
      id: '7',
      name: 'Pepperoni',
      image: '/files/pepperoni.png',
      price: '12BYN',
      description: 'Pizza with pepperoni. No vegetarian',
      enabled: ['mozzarella', 'pepperoni'],
    },
    {
      id: '8',
      name: '4 cheese',
      image: '/files/4-cheese.png',
      price: '14BYN',
      description: 'Cheesy pizza.Vegetarian',
      enabled: ['mozzarella', 'blue cheese'],
    },
    {
      id: '3',
      name: 'Pepperoni',
      image: '/files/pepperoni.png',
      price: '12BYN',
      description: 'Pizza with pepperoni. No vegetarian',
      enabled: ['mozzarella', 'pepperoni'],
    },
    {
      id: '4',
      name: '4 cheese',
      image: '/files/4-cheese.png',
      price: '14BYN',
      description: 'Cheesy pizza.Vegetarian',
      enabled: ['mozzarella', 'blue cheese'],
    },
    {
      id: '5',
      name: 'Pepperoni',
      image: '/files/pepperoni.png',
      price: '12BYN',
      description: 'Pizza with pepperoni. No vegetarian',
      enabled: ['mozzarella', 'pepperoni'],
    },
    {
      id: '6',
      name: '4 cheese',
      image: '/files/4-cheese.png',
      price: '14BYN',
      description: 'Cheesy pizza.Vegetarian',
      enabled: ['mozzarella', 'blue cheese'],
    },
  ]

  return (
    <div className="container_cards">
      {cards.map((el) => (
        <Card item={el} key={el.id} />
      ))}
    </div>
  )
}

export default Cards