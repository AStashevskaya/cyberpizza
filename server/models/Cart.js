const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
  products: { type: Array, default: [] },
  total: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
})

module.exports = model('Cart', cartSchema)
