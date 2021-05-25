const path = require('path')
const prepareApp = require('./app')

require('dotenv').config()

async function start() {
  console.log('app from start', process.env.DB_CONNECTION)
  const app = prepareApp(process.env.DB_CONNECTION)
  console.log('app from start')
  const port = process.env.PORT || 3000
  const env = process.env.NODE_ENV || 'Development'

  try {
    app.get('*', (req, res) => res.sendFile(path.resolve('dist/index.html')))
    app.listen(port, () => {
      console.log(`server is listing in ${port} - ${env} environment`)
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

start()
