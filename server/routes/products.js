const Router = require('express')
const Product = require('../models/Product')
const User = require('../models/User')
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
// router.post('/api/products', upload.single('image'), createProduct)
router.post('/api/products', authenticateToken, checkRole, upload.single('image'), createProduct)
router.delete('/api/products', authenticateToken, checkRole, deleteProduct)
router.get('/api/products/:id', getProduct)
// router.put('/api/products/:id', authenticateToken, checkRole, updateProduct)
router.put('/api/products/:id', authenticateToken, checkRole, upload.single('image'), updateProduct)

async function checkRole(req, res, next) {
  const user = await User.findById(req.user)

  console.log(user)

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
  // console.log('body', req.body)
  // console.log('file', req.file)

  const { destination, filename } = req.file

  if (destination === 'server/files/') {
    // -7 = length('/files/')
    const path = destination.slice(-7) + filename
    console.log(path)
    try {
      const notUnique = await Product.findOne({ name: req.body.name })

      if (notUnique) {
        throw new Error('Such product is alreade exist')
      }

      const product = new Product({ ...req.body, image: path })

      product.save()
      res.status(201).json({ message: 'Product is created' })
    } catch (error) {
      res.status(409).json({ message: error.message })
    }
  } else {
    res.status(400).send({ message: 'Please, write correct derection' })
  }
}

async function deleteProduct(req, res) {
  try {
    const { productId } = req.body
    console.log(productId)

    const product = await Product.findOne({ _id: productId })
    fs.unlinkSync('server/files/' + product.image)

    await Product.deleteOne({ _id: productId })

    res.sendStatus(201)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

async function updateProduct(req, res) {
  const { id } = req.params

  console.log(req.file)
  console.log(req.body)
  try {
    await Product.findOneAndUpdate({ _id: id }, { ...req.body, image: req.file ?  })

    res.sendStatus(201).json({ message: 'Product is updated' })
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

module.exports = router
