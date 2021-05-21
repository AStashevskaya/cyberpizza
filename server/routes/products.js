const Router = require('express')
const Product = require('../models/Product')
const User = require('../models/User')
const authenticateToken = require('../middleware/auth')
const router = new Router()

router.get('/api/products', getProducts)
router.post('/api/products', authenticateToken, createProduct)
router.get('/api/products/:id', getProduct)
router.put('/api/products/:id', updateProduct)

async function getProducts(req, res) {
  try {
    const products = await Product.find()

    res.status(200).json(products)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

async function getProduct(req, res) {
  const { id: _id } = req.params
  console.log(_id)

  try {
    const product = await Product.findById(_id)
    res.json(product)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

async function createProduct(req, res) {
  console.log(req.user)
  try {
    const user = await User.findById(req.user)
    console.log(user)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

async function updateProduct(req, res) {
console.log(req.user)
}

module.exports = router
