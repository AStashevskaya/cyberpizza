const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
  products: { type: Array, required: true },
  total: {}
  image: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  enabled: { type: Array },
})

module.exports = model('Cart', cartSchema)
