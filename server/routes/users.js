const Router = require('express')
const User = require('../models/User')
const router = new Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/api/users', createUser)
router.post('/api/user/login', logUser)
router.get('/api/user', authenticateToken, getUserData)
router.post('/api/user/logout', logoutUser)

async function createUser(req, res) {
  const { password, email, name } = req.body
  console.log(req.body)
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const users = await User.find()
    const user = {
      email,
      name,
      password: hashedPassword,
    }
    console.log(user)

    if (!users.length) {
      user.isAdmin = true
    }

    const isExist = users.find((person) => person.email === user.email)

    if (isExist) {
      console.log('isExist', isExist)
      res.status(400).json({ message: 'isExist' })
    } else {
      const newUser = new User(user)
      await newUser.save()

      console.log(newUser)
      res.status(201).json(newUser)
    }
    console.log(user)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

async function logUser(req, res) {
  const { email, password } = req.body
  const users = await User.find()
  const user = users.find((person) => person.email === email)
  console.log('user', user)
  if (!user) {
    return res.status(400).send('Cannot find user')
  }

  try {
    const isAllowed = await bcrypt.compare(password, user.password)
    console.log(isAllowed)

    if (isAllowed) {
      const accessToken = jwt.sign(user._id.toString(), process.env.ACCESS_TOKEN)

      res.cookie('token', accessToken)
      res.json({ accessToken })
    } else {
      return res.sendStatus(401)
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  console.log('token', token)

  if (!token) {
    return res.sendStatus(401)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
    if (error) {
      return res.sendStatus(403)
    }

    req.user = user

    next()
  })
}

async function logoutUser(req, res) {
  return res.clearCookie('token')
}

async function getUserData(req, res) {
  console.log('from data', req.user)
  const users = await User.find()

  const userData = users.find((user) => user._id.toString() === req.user)
  const { name, isAdmin, isActive } = userData
  console.log('userData', userData)
  res.json({ name, isAdmin, isActive })
}

module.exports = router
