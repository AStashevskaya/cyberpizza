const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const productsRoutes = require('./routes/products')
const cartRoutes = require('./routes/carts')
const userRoutes = require('./routes/users')

const corsOptions = {
  credentials: true,
  methods: ['GET', 'POST'],
  origin(origin, callback) {
    callback(null, true)
  },
}

function prepareApp(url) {
  const app = express()

  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  app.use(cors(corsOptions))
  app.use(cookieParser())
  app.use(express.json())
  app.use(express.static('dist'))
  app.use('/files', express.static(path.join(__dirname, './files')))
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*')
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  //   )
  //   if (req.method === 'OPTIONS') {
  //     res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
  //     return res.status(200).json({})
  //   }
  //   next()
  // })

  app.use(productsRoutes)
  app.use(cartRoutes)
  app.use(userRoutes)

  return app
}

module.exports = prepareApp
