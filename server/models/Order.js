const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
  products: { type: Array, default: [] },
  total: { type: Number, default: 0 },
  createdAt: { type: Date, default: new Date() },
  status: { type: 'String', default: 'cooking' },
})

module.exports = model('Order', orderSchema)
