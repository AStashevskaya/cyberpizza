const mongoose = require('mongoose')
const Product = require('../models/Product')
require('dotenv').config()

const productsArr = [
  {
    name: 'Pepperoni',
    image: '/files/pepperoni.png',
    price: 12,
    description: 'Tomato sauce, spicy pepperoni, mozzarella',
    enabled: ['mozzarella', 'pepperoni'],
  },
  {
    name: '4 cheese',
    image: '/files/4-cheese.png',
    price: 13,
    description: 'Creamy sauce, parmesan and cheddar cheese, blue cheese, mozzarella',
    enabled: ['mozzarella', 'blue cheese'],
  },
  {
    name: 'Italian',
    image: '/files/italian.png',
    price: 14,
    description: 'Italian herbs, tomato sauce, spicy pepperoni, olives, mozzarella, mushrooms',
    enabled: ['mozzarella', 'pepperoni'],
  },
  {
    name: 'Vegetables',
    image: '/files/vegetable.png',
    price: 10,
    description:
      'Italian herbs, tomato sauce, tomatoes, brynza cheese, olives, red onions, pepper, mozzarella, mushrooms',
    enabled: ['mozzarella', 'blue cheese'],
  },
  {
    name: 'Ham and Cheese',
    image: '/files/ham_and_cheese.png',
    price: 11,
    description: 'Mozzarella, ham, alfredo sauce',
    enabled: ['mozzarella', 'pepperoni'],
  },
  {
    name: 'Margarita',
    image: '/files/margarita.png',
    price: 9,
    description: 'Italian herbs, tomato sauce, tomatoes, mozzarella',
    enabled: ['mozzarella', 'blue cheese'],
  },
]

const postPizza = () => {
  try {
    mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

    productsArr.map((product) => {
      const newProduct = new Product(product)
      newProduct.save()
    })

    console.log('[ ] Done')
  } catch (err) {
    console.log(err)
  }
}

postPizza()
