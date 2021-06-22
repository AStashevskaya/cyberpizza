const Router = require('express')
const Order = require('../models/Order')
const authenticateToken = require('../middleware/auth')
const router = new Router()

router.get('/api/orders', authenticateToken, getOrders)
router.get('/api/orders/:id', authenticateToken, getOrder)
router.post('/api/orders', createOrder)
router.put('/api/orders/:id', authenticateToken, updateOrder)

async function getOrders(req, res) {
  const { isAdmin } = req.user

  if (!isAdmin) {
    return res.status(403)
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
  console.log(req.body)
  try {
    const order = new Order({ ...req.body })
    console.log(order)

    await order.save()

    console.log(order)
    res.cookie('order', order._id.toString())
    res.status(201).json({ message: 'Thank you for your order!', order })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

async function updateOrder(req, res) {
  const { isAdmin } = req.user

  if (!isAdmin) {
    return res.status(403)
  }

  const { id } = req.params

  try {
    const order = await Order.findOne({ _id: id })

    console.log(req.body)

    Object.assign(order, { ...req.body })
    order.save()

    res.sendStatus(200)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

module.exports = router
