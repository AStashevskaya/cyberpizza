const Router = require('express')
const Product = require('../models/Product')
const User = require('../models/User')
const authenticateToken = require('../middleware/auth')
const router = new Router()

router.get('/api/products', getProducts)
router.post('/api/products', authenticateToken, checkRole, createProduct)
router.delete('/api/products', authenticateToken, checkRole, deleteProduct)
router.get('/api/products/:id', getProduct)
router.put('/api/products/:id', authenticateToken, checkRole, updateProduct)

async function checkRole(req, res, next) {
  const user = await User.findById(req.user)

  const { isAdmin } = user

  if (!isAdmin) {
    return res.sendStatus(401)
  }
  next()
}

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

  try {
    const product = await Product.findById(_id)
    res.json(product)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

async function createProduct(req, res) {
  try {
    const product = new Product(req.body)
    product.save()
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

async function deleteProduct(req, res) {
  try {
    const { productId } = req.body

    await Product.deleteOne({ _id: productId })

    res.sendStatus(201)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

async function updateProduct(req, res) {
  const { id } = req.params
  try {
    await Product.findOneAndUpdate({ _id: id }, { ...req.body })

    res.sendStatus(201)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

module.exports = router
