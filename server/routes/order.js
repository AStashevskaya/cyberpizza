import { maxAge } from '../constants'

const Router = require('express')
const Order = require('../models/Order')
const Product = require('../models/Product')
const authenticateToken = require('../middleware/auth')
const router = new Router()

router.get('/api/orders', authenticateToken, getOrders)
router.get('/api/orders/:id', getOrder)
router.post('/api/orders', createOrder)

async function getOrders(req, res) {
  const { isAdmin } = req.user

  if (!isAdmin) {
    return res.sendStatus(403)
  }

  try {
    const orders = await Order.find()

    res.status(200).json(orders)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

async function getOrder(req, res) {
  const { id: _id } = req.params

  try {
    const order = await Order.findById(_id)

    res.status(200).json(order)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

async function createOrder(req, res) {
  try {
    const { products } = req.body

    for (let product of products) {
      const productFromDB = await Product.findById(product._id)
      if (productFromDB) {
        continue
      }

      throw new Error('Such product is not exist')
    }

    const order = new Order({ ...req.body })

    await order.save()

    res.cookie('order', order._id.toString(), { maxAge })
    res.status(201).json({ message: 'Thank you for your order!', order })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

module.exports = router
