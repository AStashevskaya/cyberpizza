const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  enabled: { type: Array },
})

module.exports = model('Product', productSchema)
