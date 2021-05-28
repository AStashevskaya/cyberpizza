import jwt from 'jsonwebtoken'

import { TEST_ACCESS_TOKEN } from '../tests/constants'

const getToken = (cookie) => {
  const cookies = cookie.split('; ')
  const tokenCookie = cookies.find((el) => el.startsWith('jwt='))
  const [tokenName, tokenValue] = tokenCookie.split('=')

  return tokenValue
}

async function authenticateToken(req, res, next) {
  let token
  const { cookie } = req.headers

  if (cookie) {
    token = getToken(cookie)
  } else {
    token = req.body.token
  }

  if (!token) {
    return res.sendStatus(401)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN || TEST_ACCESS_TOKEN, (error, user) => {
    if (error) {
      return res.sendStatus(403)
    }
    req.user = user

    next()
  })
}

module.exports = authenticateToken
