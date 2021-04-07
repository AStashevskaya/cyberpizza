const mongoose = require('mongoose')
const Product = require('../models/Product')
require('dotenv').config()

const productsArr = [
  {
    name: 'Pepperoni',
    image: '/files/pepperoni.png',
    price: '12BYN',
    description: 'Pizza with pepperoni. No vegetarian',
    enabled: ['mozzarella', 'pepperoni'],
  },
  {
    name: '4 cheese',
    image: '/files/4-cheese.png',
    price: '14BYN',
    description: 'Cheesy pizza.Vegetarian',
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
