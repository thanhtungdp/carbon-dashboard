const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const restify = require('express-restify-mongoose')
const boom = require('express-boom')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const adminMiddleware = require('./middlewares/adminMiddleware')
const userRoute = require('./routes/userRoute')

const port = parseInt(process.env.PORT, 10) || 3001

mongoose.connect('mongodb://localhost:27017/tungtung')

const routerMongoose = express.Router()
restify.serve(routerMongoose, require('./models/Test'))
restify.serve(routerMongoose, require('./models/User'))

const server = express()

server.use(cors())
server.use(boom())
server.use(bodyParser.json())
server.use(methodOverride())

server.use(authRoute)
server.use(adminMiddleware)
server.get('/me', (req, res) => {
  res.json(req.user)
})
server.use('/api/v1/users', userRoute)
server.use(routerMongoose)

server.listen(port, err => {
  if (err) {
    throw err
  }
  console.log(`> Ready on http://localhost:${port}`)
})
