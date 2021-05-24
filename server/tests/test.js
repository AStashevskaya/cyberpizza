const MongoMemoryServer = require('mongodb-memory-server')
const { prepareApp } = require('../')
const request = require('supertest')
import 'babel-polyfill'
// const Products = require('../models/Products')
// const User = require('../models/User')
const mongoose = require('mongoose')

describe('Test', function () {
  let mongod, app

  beforeEach(async () => {
    mongod = new MongoMemoryServer()
    const mongoUrl = await mongod.getUri()
    // console.log(mongoUrl)
    // await main(mongoUrl);
    const server = await prepareApp(mongoUrl)
    app = request(server)
  })

  test('Create new user', async function (done) {
    const res = await app.post('/api/users').send({
      name: 'Nastya',
      email: 'test123@mail.ru',
      password: '123',
    })
    expect(res.statusCode).toEqual(200)
    const userCount = await mongoose.model('User').countDocuments()
    // console.log(userCount)
    expect(userCount).toEqual(1)
    done()
  }, 30000)

  afterEach(async () => {
    await mongod.stop()
  })
})

// const mongod = new MongoMemoryServer()

// async function prepareApp(mongoUrl) {
//   require('./models')

//   await mongoose.connect(mongoUrl, { useNewUrlParser: true })

//   const app = express()

//   app.use(cors('*'))
//   app.use(cookieParser())
//   app.use(require('./lib/session'))
//   app.use('/api', require('./api'))

//   return app
// }
describe('Sample Test', () => {
  it('should test that true === true', () => {
    expect(true).toBe(true)
  })
})
