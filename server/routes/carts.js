const Router = require('express')
const Cart = require('../models/Cart')
const router = new Router()

router.post('/api/carts', createCart)
router.get('/api/carts', getCarts)
router.get('/api/carts/:id', getCart)
router.post('/api/carts/:id/products', addProduct)
router.put('/api/carts/:id/products', changeQuantity)
router.delete('/api/carts/:id/products', deleteProduct)

async function createCart(req, res) {
  const cart = req.body
  const { id: _id } = req.params
  console.log('id', _id)
  console.log('cart', cart)

  if (_id) {
    console.log('id')
  } else {
    const newCart = new Cart(cart)
    try {
      await newCart.save()

      console.log(newCart)

      res.status(201).json(newCart)
    } catch (error) {
      res.status(409).json({ message: error.message })
    }
  }
}

async function getCarts(req, res) {
  try {
    const carts = await Cart.find()

    res.status(200).json(carts)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

async function getCart(req, res) {
  const { id: _id } = req.params

  try {
    const cart = await Cart.findById(_id)

    res.json(cart)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

async function addProduct(req, res) {
  const product = req.body
  const { id: _id } = req.params

  try {
    const cart = await Cart.findById(_id)
    cart.products = [...cart.products, product]
    cart.total = cart.total + +product.price
    cart.save()
    res.json(cart)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

async function changeQuantity(req, res) {
  const { productId, quantity } = req.body
  const { id: _id } = req.params

  try {
    const cart = await Cart.findById(_id)

    const products = [
      ...cart.products.map((product) => {
        if (product.productId === productId) {
          return {
            ...product,
            quantity: quantity,
          }
        }

        return product
      }),
    ]

    const total = products.reduce((accum, item) => (accum += item.quantity * item.price), 0)

    await cart.update({ products, total })
    res.json(cart)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

async function deleteProduct(req, res) {
  const { productId } = req.body
  const { id: _id } = req.params

  try {
    const cart = await Cart.findById(_id)

    const product = cart.products.find((product) => product.productId === productId)
    const prodIdx = cart.products.indexOf(product)

    cart.products.splice(prodIdx, prodIdx + 1)
    cart.total = cart.total - product.price * product.quantity

    cart.save()

    res.json(cart)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

module.exports = router
