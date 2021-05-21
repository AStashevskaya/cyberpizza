const jwt = require('jsonwebtoken')

const getToken = (cookie) => {
  const cookies = cookie.split('; ')
  const tokenCookie = cookies.find((el) => el.startsWith('jwt='))
  const [tokenName, tokenValue] = tokenCookie.split('=')

  return tokenValue
}

async function authenticateToken(req, res, next) {
  const { cookie } = req.headers
  const token = getToken(cookie)

  if (!token) {
    return res.sendStatus(401)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN, (error, user) => {
    if (error) {
        console.log('error')
      return res.sendStatus(403)
    }
    req.user = user

    next()
  })
}

module.exports = authenticateToken
