const mongoose = require('mongoose')
const { Schema } = mongoose

module.exports.SALT_ROUNDS = 10
module.exports = mongoose.model(
  'users',
  new Schema({
    username: {
      type: String,
      unique: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    fullName: String,
    password: String,
    lastUpdatedPassword: {
      type: Date,
      default: Date.now()
    },
    phone: {
      country: String,
      phone: String
    },
    introduction: String,
    profile: {
      cover: { type: String, default: '' },
      coverPosition: { type: Number, default: 50 }
    },
    avatar: {
      avatar: { type: String, default: '' },
      old: { type: Boolean, default: false }
    },
    statics: {
      totalTestCreated: { type: Number, default: 0 },
      totalFollowers: { type: Number, default: 0 },
      totalFollowing: { type: Number, default: 0 }
    },
    birthday: Date,
    role: {
      type: String,
      default: 'PLAYER'
    },
    active: {
      type: Object,
      default: {
        isActive: false,
        code: ''
      }
    },
    facebookID: String,
    googleID: String,
    gender: String,
    isOwner: {
      type: Boolean,
      default: false
    },
    firstLogin: {
      type: Boolean,
      default: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  })
)
