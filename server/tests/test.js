import 'babel-polyfill'
const { MongoMemoryServer } = require('mongodb-memory-server')
const prepareApp = require('../app')
const request = require('supertest')

const mongoose = require('mongoose')

const userData = {
  name: 'Anastasiya',
  email: 'test@mail.ru',
  password: '123',
}

describe('Test', function () {
  let mongoServer, app

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer()
    const mongoUri = await mongoServer.getUri()

    const server = await prepareApp(mongoUri)
    app = request(server)
  })

  test('Create new user', async () => {
    const result = await app.post('/api/users').send(userData)
    const userCount = await mongoose.model('User').count()

    expect(result.statusCode).toEqual(201)
    expect(userCount).toEqual(1)
  }, 10000)

  test('Create already existed user', async () => {
    const result = await app.post('/api/users').send(userData)

    const { message } = JSON.parse(result.text)

    expect(result.statusCode).toEqual(400)
    expect(message).toEqual('This email is already registered')
  }, 10000)

  test('Log with incorrect password', async () => {
    const result = await app.post('/api/user/login').send({
      ...userData,
      password: '1234',
    })

    const { message } = JSON.parse(result.text)

    expect(result.statusCode).toEqual(400)
    expect(message).toEqual('Incorrect password')
  }, 10000)

  test('Log with not regestered email', async () => {
    const result = await app.post('/api/user/login').send({
      email: 'test3@mail.ru',
      password: '123',
    })

    const { message } = JSON.parse(result.text)

    expect(result.statusCode).toEqual(400)
    expect(message).toEqual('This email is not registered')
  }, 10000)

  test('Success login', async () => {
    const result = await app.post('/api/user/login').send(userData)

    expect(result.statusCode).toEqual(200)
  }, 10000)

  test('Success logout', async () => {
    const result = await app.post('/api/user/logout')
    expect(result.statusCode).toEqual(200)
  }, 10000)

  // test('Add not exested product to cart', async () => {
  //   const result = await app.post('/api/carts/60acc9a5eeab7c1964471e02/products').send({
  //     productId: '123456789',
  //   })

  //   const { message } = JSON.parse(result.text)
  //   console.log(message)

  //   expect(result.statusCode).toEqual(404)
  //   expect(message).toEqual('Such product is not exist')
  // }, 10000)

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })
})
