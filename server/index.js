const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const productsRouts = require('./routes/products')
const cors = require('cors')
const path = require('path')

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
    app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname, "client/index.html"));
    });
    app.use('/files', express.static(path.join(__dirname, './files')))
    app.use(productsRouts)
    app.listen(port, 'localhost', () => {
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
