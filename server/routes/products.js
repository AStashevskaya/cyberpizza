const Router = require('express')
const Product = require('../models/Product')
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

router.get('/api/products', getProducts)
router.post('/api/products', authenticateToken, upload.single('image'), createProduct)
router.delete('/api/products', authenticateToken, deleteProduct)
router.get('/api/products/:id', getProduct)
router.put('/api/products/:id', authenticateToken, upload.single('image'), updateProduct)

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
    const { productId } = req.body

    const product = await Product.findOne({ _id: productId })

    fs.unlinkSync('server' + product.image)

    await Product.deleteOne({ _id: productId })

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

    const enabled = req.body.enabled.split(',')

    Object.assign(product, { ...req.body, image: req.file ? path : product.image, enabled })
    product.save()

    res.sendStatus(200)
  } catch (error) {
    res.status(409).json({ message: 'Something goes wrong' })
  }
}

module.exports = router
