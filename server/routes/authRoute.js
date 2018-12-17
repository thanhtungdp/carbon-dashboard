const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

const users = [
  {
    email: 'tungptkh@gmail.com',
    fullname: 'Phan Thanh Tung',
    password: 'happy2code'
  }
]

router.post('/login', (req, res) => {
  const { email, password } = req.body
  const user = users.find(u => u.email === email && u.password === password)
  if (user) {
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '32d' })
    res.status(200).json({
      token,
      user: {
        email: user.email,
        fullname: user.fullname
      }
    })
  } else {
    res.boom.unauthorized('EMAIL_FAILED')
  }
})

module.exports = router
