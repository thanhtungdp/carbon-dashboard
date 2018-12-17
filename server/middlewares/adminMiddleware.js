const { JWT_SECRET } = require('../config')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const token = req.headers['authorization']
  if (token) {
    try {
      const data = await jwt.verify(token, JWT_SECRET)
      req.user = data
      next()
    } catch (e) {
      res.boom.unauthorized()
    }
  } else {
    res.boom.unauthorized()
  }
}
