import React from 'react';

import Card from '../Card'
import './index.scss'

const Cards = () => {
const cards = [
        {
          id: '1',
          name: 'Pepperoni',
          image: '/files/pepperoni.jpg',
          price: '12BYN',
          description: 'Pizza with pepperoni. No vegetarian',
          enabled: ['mozzarella', 'pepperoni'],
        },
        { 
          id: '2',
          name: '4 cheese',
          image: '/files/4-cheese.jpg',
          price: '14BYN',
          description: 'Cheesy pizza.Vegetarian',
          enabled: ['mozzarella', 'blue cheese'],
        },
      ]
    
    return (
        <div className="cards__container">
            {cards.map((el) => <Card item={el} key={el.id}/>)}
        </div>
    )
}

export default Cards;