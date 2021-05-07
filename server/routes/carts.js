const Router = require('express')
const Cart = require('../models/Cart')
const Product = require('../models/Product')
const router = new Router()

router.post('/api/carts', createCart)
router.get('/api/carts', getCarts)
router.get('/api/carts/:id', getCart)
router.post('/api/carts/:id/products', addProduct)
router.put('/api/carts/:id/products', changeQuantity)
router.delete('/api/carts/:id/products', deleteProduct)

async function createCart(req, res) {
  const cart = req.body

  const newCart = new Cart(cart)
  try {
    await newCart.save()

    res.cookie('cart_id10', newCart._id.toString())
    res.status(201).json(newCart)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

async function getCarts(req, res) {
  let authData = new Buffer(process.env.AUTH)
  let base64data = authData.toString('base64')
  const auth = 'Basic ' + base64data

  if (auth === req.headers.authorization) {
    try {
      const carts = await Cart.find()

      res.status(200).json(carts)
    } catch (error) {
      res.status(404).json({ message: error.message })
    }
  } else {
    res.status(401).json()
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
  const { productId } = req.body
  const { id: _id } = req.params

  try {
    const cart = await Cart.findById(_id)
    const product = await Product.findById(productId)

    if (product) {
      const { image, _id, price, name } = product

      cart.products.push({ image, _id, price, name, quantity: 1 })
      cart.total = cart.total + +product.price

      cart.save()
      res.json(cart)
    } else {
      throw new Error()
    }
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
        if (product._id.toString() === productId) {
          return {
            ...product,
            quantity: quantity,
          }
        }

        return product
      }),
    ]

    console.log(products)

    const total = products.reduce((accum, item) => accum + item.quantity * item.price, 0)

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

    const prodIdx = cart.products.findIndex((product) => product._id.toString() === productId)

    cart.products.splice(prodIdx, 1)
    cart.total = cart.products.reduce(
      (accum, product) => accum + product.quantity * product.price,
      0
    )

    cart.save()

    res.json(cart)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

module.exports = router