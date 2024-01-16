const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
const config = require('./utils/config')
// const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const notesRouter = require('./controllers/persons')
const app = express()

mongoose.connect(config.MONGODB_URI)

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(morgan('tiny'))

app.use('/api/persons', notesRouter)

app.get('/', (req, res) => {
  res.send('<h1>Hola Mundo</h1>')
})

app.get('/info', (req, res) => {
  Person.find({})
    .then((persons) => {
      const HTML = `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
      res.send(HTML)
    })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
