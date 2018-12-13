const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const restify = require('express-restify-mongoose')
const cors = require('cors')

const port = parseInt(process.env.PORT, 10) || 3001

mongoose.connect('mongodb://localhost:27019/tungtung')

const routerMongoose = express.Router()
restify.serve(routerMongoose, require('./models/Test'))
restify.serve(routerMongoose, require('./models/User'))

const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use(methodOverride())

server.use(routerMongoose)

server.listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`> Ready on http://localhost:${port}`)
})
