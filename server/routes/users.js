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

const getToken = (cookie) => {
  const cookies = cookie.split('; ')
  const tokenCookie = cookies.find((el) => el.startsWith('jwt='))
  const [tokenName, tokenValue] = tokenCookie.split('=')

  return tokenValue
}

async function createUser(req, res) {
  const { password, email, name } = req.body

  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const length = await User.count()
    console.log(length)

    const user = {
      email,
      name,
      password: hashedPassword,
    }

    if (!length) {
      user.isAdmin = true
    }

    const isExist = await User.findOne({ email })

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
  const user = await User.findOne({ email })

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
  const { cookie } = req.headers
  const token = getToken(cookie)

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

async function getUserData(req, res) {
  const user = await User.findOne({ _id: req.user })

  const { name, isAdmin, isActive } = user

  res.json({ name, isAdmin, isActive })
}

async function logoutUser(req, res) {
  try {
    res.cookie('jwt', '', { maxAge: 1 }).end()
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = router
