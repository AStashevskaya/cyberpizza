const jwt = require('jsonwebtoken')

const User = require('../models/User')
const getCookies = require('../../shared/utils/getCookie')
// import { getCookies } from '../../shared/utils/getCookie'
const ACCESS_TOKEN = require('../config')
// import { ACCESS_TOKEN } from '../config'

async function authenticateToken(req, res, next) {
  let token
  const { cookie } = req.headers

  if (cookie) {
    token = getCookies('jwt', cookie)
  } else {
    token = req.body.token
  }

  if (!token) {
    return res.sendStatus(401)
  }

  jwt.verify(token, ACCESS_TOKEN, async (error, user) => {
    if (error) {
      return res.sendStatus(403)
    }

    try {
      const currentUser = await User.findById(user)

      if (currentUser) {
        req.user = currentUser

        next()
      }
    } catch (error) {
      res.sendStatus(404)
    }
  })
}

module.exports = authenticateToken
