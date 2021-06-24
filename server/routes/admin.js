const Router = require('express')
const Product = require('../models/Product')
const User = require('../models/User')
const Order = require('../models/Order')
const authenticateToken = require('../middleware/auth')
const multer = require('multer')
const fs = require('fs')
const router = new Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'server/files/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
})
const upload = multer({ storage })

//products
router.put('/api/products/:id', authenticateToken, upload.single('image'), updateProduct)
router.post('/api/products', authenticateToken, upload.single('image'), createProduct)
router.delete('/api/products', authenticateToken, deleteProduct)

//users
router.put('/api/users/:id', authenticateToken, updateUser)
router.delete('/api/users', authenticateToken, deleteUser)

//orders
router.put('/api/orders/:id', authenticateToken, updateOrder)
router.delete('/api/orders', authenticateToken, deleteOrder)

async function createProduct(req, res) {
  const { isAdmin } = req.user

  if (!isAdmin) {
    return res.status(403)
  }

  const { destination, filename } = req.file

  if (destination === 'server/files/') {
    // -7 = length('/files/')
    const path = destination.slice(-7) + filename

    try {
      const notUnique = await Product.findOne({ name: req.body.name })

      if (notUnique) {
        throw new Error('Such product is alreade exist')
      }

      const enabled = req.body.enabled.split(',')

      const product = new Product({ ...req.body, image: path, enabled })

      product.save()
      res.status(201).json({ message: 'Product is created', product })
    } catch (error) {
      res.status(409).json({ message: error.message })
    }
  } else {
    return res.status(400).send({ message: 'Please, write correct derection' })
  }
}

async function deleteProduct(req, res) {
  const { isAdmin } = req.user

  if (!isAdmin) {
    return res.status(403)
  }

  try {
    const { id } = req.body

    const product = await Product.findOne({ _id: id })

    fs.unlinkSync('server' + product.image)

    await Product.deleteOne({ _id: id })

    res.sendStatus(200)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

async function updateProduct(req, res) {
  const { isAdmin } = req.user

  if (!isAdmin) {
    return res.status(403)
  }

  let path
  const { id } = req.params

  try {
    const product = await Product.findOne({ _id: id })

    if (req.file) {
      const { destination, filename } = req.file

      path = destination.slice(-7) + filename

      fs.unlinkSync('server' + product.image)
    }

    const enabled = req.body.enabled.split(',').map((el) => el.trim())

    Object.assign(product, { ...req.body, image: req.file ? path : product.image, enabled })
    product.save()

    res.sendStatus(200)
  } catch (error) {
    res.status(409).json({ message: 'Something goes wrong' })
  }
}

async function updateUser(req, res) {
  const { isAdmin } = req.user

  if (!isAdmin) {
    return res.status(403)
  }

  const { id } = req.params

  try {
    const user = await User.findOne({ _id: id })

    Object.assign(user, { ...req.body })
    user.save()

    res.sendStatus(200)
  } catch (error) {
    res.status(409).json({ message: 'Something goes wrong' })
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

    Object.assign(order, { ...req.body })
    order.save()

    res.sendStatus(200)
  } catch (error) {
    res.status(409).json({ message: 'Something goes wrong' })
  }
}

async function deleteUser(req, res) {
  const { isAdmin } = req.user

  if (!isAdmin) {
    return res.status(403)
  }

  const { id } = req.body

  try {
    await User.deleteOne({ _id: id })

    res.sendStatus(200)
  } catch (error) {
    res.status(409).json({ message: 'Something goes wrong' })
  }
}

async function deleteOrder(req, res) {
  const { isAdmin } = req.user

  if (!isAdmin) {
    return res.status(403)
  }

  const { id } = req.body

  try {
    await Order.deleteOne({ _id: id })

    res.sendStatus(200)
  } catch (error) {
    res.status(409).json({ message: 'Something goes wrong' })
  }
}

module.exports = router
