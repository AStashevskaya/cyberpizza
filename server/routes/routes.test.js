import 'babel-polyfill'
import { product, adminData, userData } from '../constants'

const { MongoMemoryServer } = require('mongodb-memory-server')
const prepareApp = require('../app')
const request = require('supertest')
const mongoose = require('mongoose')
const Cart = require('../models/Cart')
const Product = require('../models/Product')

describe('Test', function () {
  let mongoServer, app

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer()
    const mongoUri = await mongoServer.getUri()

    const server = prepareApp(mongoUri)
    app = request(server)
  })

  test('Create new user, admin', async () => {
    const result = await app.post('/api/users').send(adminData)

    const userCount = await mongoose.model('User').countDocuments()

    expect(result.statusCode).toEqual(201)
    expect(userCount).toEqual(1)
  })

  test('Create new user, no admin', async () => {
    const result = await app.post('/api/users').send(userData)
    const userCount = await mongoose.model('User').countDocuments()

    expect(userCount).toEqual(2)
    expect(result.statusCode).toEqual(201)
  })

  test('Create new user with not valid email', async () => {
    const result = await app.post('/api/users').send({ ...userData, email: 'test@' })

    expect(result.statusCode).toEqual(409)
  })

  test('Create already existed user', async () => {
    const result = await app.post('/api/users').send(userData)

    const { message } = JSON.parse(result.text)

    expect(result.statusCode).toEqual(400)
    expect(message).toEqual('This email is already registered')
  })

  test('Create new user with not confirmed password', async () => {
    const result = await app.post('/api/users').send({ ...userData, confirmedPassword: '' })

    expect(result.statusCode).toEqual(400)
  })

  test('Log with incorrect password', async () => {
    const result = await app.post('/api/user/login').send({
      ...userData,
      password: '1234',
    })

    const { message } = JSON.parse(result.text)

    expect(result.statusCode).toEqual(400)
    expect(message).toEqual('Incorrect password')
  })

  test('Log with not registered email', async () => {
    const result = await app.post('/api/user/login').send({
      email: 'test3@mail.ru',
      password: '123',
    })

    const { message } = JSON.parse(result.text)

    expect(result.statusCode).toEqual(400)
    expect(message).toEqual('This email is not registered')
  })

  test('Success login', async () => {
    const result = await app.post('/api/user/login').send(userData)

    expect(result.statusCode).toEqual(200)
  }, 10000)

  test('Success logout', async () => {
    const result = await app.post('/api/user/logout')
    expect(result.statusCode).toEqual(200)
  })

  test('Get carts if admin', async () => {
    const result = await app.post('/api/user/login').send(adminData)
    const { token } = JSON.parse(result.text)

    const get_result = await app.get('/api/carts').send({ token })

    expect(get_result.statusCode).toEqual(200)
  })

  test('Get carts if not admin', async () => {
    const result = await app.post('/api/user/login').send(userData)
    const { token } = JSON.parse(result.text)

    const get_result = await app.get('/api/carts').send({ token })

    expect(get_result.statusCode).toEqual(403)
  })

  test('Add not exested product to cart', async () => {
    const cart = new Cart({})
    await cart.save()

    const { _id } = cart

    const result = await app.post(`/api/carts/${_id}/products`).send({
      productId: '123456789',
    })

    expect(result.statusCode).toEqual(404)
  })

  test('Add product to cart', async () => {
    const { _id } = await Cart.findOne()

    const newProduct = new Product(product)
    await newProduct.save()

    const { _id: productId } = await Product.findOne()

    const result = await app.post(`/api/carts/${_id}/products`).send({ productId })

    expect(result.statusCode).toEqual(200)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })
})
