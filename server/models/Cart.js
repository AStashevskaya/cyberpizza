const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
  products: { type: Array, required: true },
  total: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
})

module.exports = model('Cart', cartSchema)
