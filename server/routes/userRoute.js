const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.put('/:_id/update-password', async (req, res) => {
  const password = req.body.password
  if (!password) {
    res.boom.notAcceptable('NO_PASSWORD')
    return
  }
  const passwordHash = await bcrypt.hash(password, 10)
  const user = await User.findOneAndUpdate(
    { _id: req.params._id },
    {
      $set: {
        password: passwordHash
      }
    },
    { new: true }
  )
  res.json(user).status(200)
})

module.exports = router
