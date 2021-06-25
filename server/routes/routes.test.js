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
  })

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

  // TESTING ADMIN ROUTES ORDERS
  test('Get orders if not admin', async () => {
    const result = await app.post('/api/user/login').send(userData)
    const { token } = JSON.parse(result.text)

    const get_result = await app.get('/api/orders').send({ token })

    expect(get_result.statusCode).toEqual(403)
  })

  test('Get orders if admin', async () => {
    const result = await app.post('/api/user/login').send(adminData)
    const { token } = JSON.parse(result.text)

    const get_result = await app.get('/api/orders').send({ token })

    expect(get_result.statusCode).toEqual(200)
  })

  test('Create order', async () => {
    const { body: products } = await app.get('/api/products')
    const productFromDB = products[0]

    const result = await app.post('/api/orders').send({ products: [productFromDB] })

    expect(result.statusCode).toEqual(201)
  })

  test('Create order with not existed product', async () => {
    const result = await app.post('/api/orders').send({ products: [{ ...product, _id: '' }] })

    expect(result.statusCode).toEqual(404)
  })

  test('Update order if admin', async () => {
    const result = await app.post('/api/user/login').send(adminData)
    const { token } = JSON.parse(result.text)

    const { body: orders } = await app.get('/api/orders').send({ token })
    const { _id } = orders[0]

    const updatingResult = await app.put(`/api/orders/${_id}`).send({ token, status: 'delivered' })

    expect(updatingResult.statusCode).toEqual(200)
  })

  test('Update order if not admin', async () => {
    const result = await app.post('/api/user/login').send(adminData)
    const { token } = JSON.parse(result.text)

    const { body: orders } = await app.get('/api/orders').send({ token })
    const { _id } = orders[0]

    const userResult = await app.post('/api/user/login').send(userData)
    const { token: userToken } = JSON.parse(userResult.text)

    const updatingResult = await app
      .put(`/api/orders/${_id}`)
      .send({ token: userToken, status: 'cancelled' })

    expect(updatingResult.statusCode).toEqual(403)
  })

  test('Delete order if admin', async () => {
    const result = await app.post('/api/user/login').send(adminData)
    const { token } = JSON.parse(result.text)

    const { body: orders } = await app.get('/api/orders').send({ token })
    const { _id } = orders[0]

    const deletingResult = await app.delete('/api/orders').send({ token, data: { id: _id } })

    expect(deletingResult.statusCode).toEqual(200)
  })

  test('Delete order if not admin', async () => {
    const result = await app.post('/api/user/login').send(adminData)
    const { token } = JSON.parse(result.text)

    const { body: orders } = await app.get('/api/orders').send({ token })
    const { _id } = orders[0]

    const userResult = await app.post('/api/user/login').send(userData)
    const { token: userToken } = JSON.parse(userResult.text)

    const deletingResult = await app
      .delete('/api/orders')
      .send({ token: userToken, data: { id: _id } })

    expect(deletingResult.statusCode).toEqual(403)
  })

  // TESTING ADMIN ROUTES USERS
  test('Get users if not admin', async () => {
    const result = await app.post('/api/user/login').send(userData)
    const { token } = JSON.parse(result.text)

    const get_result = await app.get('/api/users').send({ token })

    expect(get_result.statusCode).toEqual(403)
  })

  test('Get users if admin', async () => {
    const result = await app.post('/api/user/login').send(adminData)
    const { token } = JSON.parse(result.text)

    const get_result = await app.get('/api/users').send({ token })

    expect(get_result.statusCode).toEqual(200)
  })

  test('Update user if not admin', async () => {
    const result = await app.post('/api/user/login').send(adminData)
    const { token } = JSON.parse(result.text)

    const { body: users } = await app.get('/api/users').send({ token })
    const user = users[0]

    const userResult = await app.post('/api/user/login').send(userData)
    const { token: userToken } = JSON.parse(userResult.text)

    const updatingResult = await app
      .put(`/api/orders/${user._id}`)
      .send({ token: userToken, isActive: false })

    expect(updatingResult.statusCode).toEqual(403)
  })

  test('Update user if admin', async () => {
    const result = await app.post('/api/user/login').send(adminData)
    const { token } = JSON.parse(result.text)

    const { body: users } = await app.get('/api/users').send({ token })
    const user = users.find((user) => user.isAdmin === false)

    const updatingResult = await app.put(`/api/users/${user._id}`).send({ token, isActive: false })

    expect(updatingResult.statusCode).toEqual(200)
  })

  test('Login if user is inactive', async () => {
    const result = await app.post('/api/user/login').send(adminData)
    const { token } = JSON.parse(result.text)

    const { body: users } = await app.get('/api/users').send({ token })
    const user = users.find((user) => user.isAdmin === false)

    const resultOfLogin = await app.post('/api/user/login').send(userData)
    await app.put(`/api/users/${user._id}`).send({ token, isActive: true })

    expect(resultOfLogin.statusCode).toEqual(400)
  })

  test('Delete user if admin', async () => {
    const result = await app.post('/api/user/login').send(adminData)
    const { token } = JSON.parse(result.text)

    const { body: users } = await app.get('/api/users').send({ token })
    const user = users.find((user) => user.isAdmin === false)

    const deletingResult = await app.delete('/api/users').send({ token, data: { id: user._id } })

    expect(deletingResult.statusCode).toEqual(200)
  })

  test('Delete user if not admin', async () => {
    const result = await app.post('/api/user/login').send(adminData)
    const { token } = JSON.parse(result.text)

    const { body: users } = await app.get('/api/users').send({ token })
    const user = users[0]

    const userResult = await app.post('/api/user/login').send(userData)
    const { token: userToken } = JSON.parse(userResult.text)

    const deletingResult = await app
      .delete('/api/orders')
      .send({ token: userToken, data: { id: user._id } })

    expect(deletingResult.statusCode).toEqual(403)
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoServer.stop()
  })
})
