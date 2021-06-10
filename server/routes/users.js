import * as yup from 'yup'
import bcrypt from 'bcryptjs'
import { Router } from 'express'

import User from '../models/User'
import { ACCESS_TOKEN } from '../config'

const router = new Router()
const jwt = require('jsonwebtoken')
const authenticateToken = require('../middleWare/auth')

router.post('/api/users', createUser)
router.post('/api/user/login', logUser)
router.get('/api/user', authenticateToken, getUserData)
router.post('/api/user/logout', logoutUser)

const createToken = (id) => jwt.sign(id, ACCESS_TOKEN)

const maxAge = 24 * 60 * 60 * 1000

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required(),
})

async function createUser(req, res) {
  const { password, email, name, confirmedPassword } = req.body

  if (password !== confirmedPassword) {
    return res.status(400).send({ message: 'Passwords must match' })
  }

  try {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const length = await User.countDocuments()

    const user = {
      email,
      name,
      password: hashedPassword,
    }

    await schema.validate(user)

    if (!length) {
      user.isAdmin = true
    }

    const isExist = await User.findOne({ email })

    if (isExist) {
      return res.status(400).send({ message: 'This email is already registered' })
    } else {
      const newUser = new User(user)
      newUser.save()

      const accessToken = createToken(newUser._id.toString())

      res.cookie('jwt', accessToken)
      res.status(201).json({ token: accessToken })
    }
  } catch (error) {
    const { message } = error
    console.log(message)

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
      res.json({ token: accessToken })
    } else {
      throw new Error('Incorrect password')
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

async function getUserData(req, res) {
  if (req.user) {
    res.status(200).json(req.user)
  } else {
    res.status(404).json({ message: 'User not found' })
  }
}

async function logoutUser(req, res) {
  try {
    res.cookie('jwt', '', { maxAge: 1 }).end()
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = router
