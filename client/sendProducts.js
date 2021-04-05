const mongoose = require('mongoose')
const Product = require("../server/models/Product");
require('dotenv').config()

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

const productsArr = [
    {
        "name": "Pepperoni",
        "image": "/files/pepperoni.jpg",
        "price": "12BYN",
        "description": "Pizza with pepperoni. No vegetarian",
        "enabled": ["mozzarella", "pepperoni"]

    },
    {
        "name": "4 cheese",
        "image": "/files/4-cheese.jpg",
        "price": "14BYN",
        "description": "Cheesy pizza.Vegetarian",
        "enabled": ["mozzarella", "blue cheese"]
    },
]

const postPizza = () => {
    productsArr.map((product) => {
        const newProduct = new Product(product)
        newProduct.save()
      })
};

postPizza()