const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const productsRoutes = require('./routes/products')
const cartRoutes = require('./routes/carts')
const userRoutes = require('./routes/users')

require('dotenv').config()

const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    callback(null, true)
  },
}

async function start() {
  const app = prepareApp(process.env.DB_CONNECTION)
  const port = process.env.PORT || 3000
  const env = process.env.NODE_ENV || 'Development'

  try {
    app.use(cors(corsOptions))
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.static('dist'))
    app.use('/files', express.static(path.join(__dirname, './files')))

    app.use(productsRoutes)
    app.use(cartRoutes)
    app.use(userRoutes)
    app.listen(port, () => {
      console.log(`server is listing in ${port} - ${env} environment`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

function prepareApp(url) {
  const app = express()

  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

  return app
}

start()
