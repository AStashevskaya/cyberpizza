const Router = require('express')
const Product = require('../models/Product')
const router = new Router()

router.get('/api/products', getProducts)
router.get('/api/products/:id', getProduct)

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

module.exports = router
