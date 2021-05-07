const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const productsRouts = require('./routes/products')
const cartRouts = require('./routes/carts')
const userRouts = require('./routes/users')
// const registerRouts = require('./routes/register')

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
    app.use(bodyParser.json({ extended: true }))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('dist'))
    app.use('/files', express.static(path.join(__dirname, './files')))
    app.use(cookieParser())
    // app.get('/register', (req, res) => {
    //   res.send('register')
    // })
    app.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, '../dist/index.html'), function (err) {
        if (err) {
          res.status(500).send(err)
        }
      })
    })
    app.use('/register', express.static('dist'))
    // app.use('/register', registerRoutes)
    app.use(productsRouts)
    app.use(cartRouts)
    app.use(userRouts)
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
