const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
  products: { type: Array, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, required: true },
})

module.exports = model('Cart', cartSchema)
