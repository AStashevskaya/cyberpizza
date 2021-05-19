const Router = require('express')
const User = require('../models/User')
const router = new Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/api/users', createUser)
router.post('/api/user/login', logUser)
router.get('/api/user', authenticateToken, getUserData)
router.post('/api/user/logout', logoutUser)

const createToken = (id) => jwt.sign(id.toString(), process.env.ACCESS_TOKEN)
const maxAge = 24 * 60 * 60 * 1000

async function createUser(req, res) {
  const { password, email, name } = req.body

  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const users = await User.find()
    const user = {
      email,
      name,
      password: hashedPassword,
    }

    if (!users.length) {
      user.isAdmin = true
    }

    const isExist = users.find((person) => person.email === user.email)

    if (isExist) {
      res.status(400).send({ message: 'This email is already registered' })
    } else {
      const newUser = new User(user)
      await newUser.save()

      const accessToken = createToken(newUser._id.toString())

      res.cookie('jwt', accessToken)
      res.status(201).json({ user: newUser._id.toString() })
    }
  } catch (error) {
    const { message } = error

    res.status(409).send({ message })
  }
}

async function logUser(req, res) {
  const { email, password } = req.body
  const users = await User.find()
  const user = users.find((person) => person.email === email)

  try {
    if (!user) {
      throw new Error('This email is not registered')
    }

    const isAllowed = await bcrypt.compare(password, user.password)

    if (isAllowed) {
      const accessToken = createToken(user._id.toString())

      res.cookie('jwt', accessToken, { maxAge })
      res.json({ user: user._id.toString() })
    } else {
      throw new Error('Incorrect password')
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  console.log('from auth headers', req.headers)
  const token = authHeader && authHeader.split(' ')[1]
  console.log('token', token)

  if (!token) {
    return res.sendStatus(401)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
    if (error) {
      return res.sendStatus(403)
    }
    console.log('user', user)
    req.user = user

    next()
  })
}

async function getUserData(req, res) {
  const users = await User.find()

  const userData = users.find((user) => user._id.toString() === req.user)
  const { name, isAdmin, isActive } = userData

  res.json({ name, isAdmin, isActive })
}

async function logoutUser(req, res) {
  console.log('user', req.headers)
  const authHeader = req.headers['authorization']
  console.log('from auth headers', req.headers)
  const token = authHeader && authHeader.split(' ')[1]
  console.log('token', token)

  try {
    await jwt.decode(token)
    res.cookie('jwt', '', { maxAge: 1 })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = router
