const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: { type: String, isRequired: true },
  name: { type: String, isRequired: true },
  password: { type: String, isRequired: true },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
})

module.exports = model('User', userSchema)
