const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports = mongoose.model(
  'tests',
  new Schema({
    title: String
  })
)
