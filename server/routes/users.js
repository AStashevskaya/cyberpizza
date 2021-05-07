const Router = require('express')
const User = require('../models/User')
const router = new Router()
const bcrypt = require('bcryptjs')

router.post('/api/users', createUser)

async function createUser(req, res) {
  const { password, email, name } = req.body

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
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

module.exports = router
