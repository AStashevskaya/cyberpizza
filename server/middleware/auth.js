const jwt = require('jsonwebtoken')

import User from '../models/User'
import { getCookies } from '../../shared/utils/getCookie'
import { ACCESS_TOKEN } from '../config'

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
