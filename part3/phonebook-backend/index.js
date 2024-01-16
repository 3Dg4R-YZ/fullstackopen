require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')
const app = express()

const PORT = process.env.PORT || 3001
const url = process.env.MONGODB_URI
mongoose.connect(url)

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

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

app.get('/api/persons', (req, res) => {
  Person.find({}).then((result) => res.send(result))
})

app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id)
    .then((person) => {
      if (person) {
        res.send(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.post('/api/persons', (req, res) => {
  const newPerson = new Person({ ...req.body })
  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({ error: 'content missing' })
  }
  Person.find({}).then((result) => {
    if (result.some((person) => person.name.toLowerCase() === newPerson.name.toLowerCase())) {
      return res.status(400).json({ error: 'this person exists' })
    }
    newPerson.save()
      .then((result) => {
        console.log(`added ${newPerson.name} number ${newPerson.number} to phonebook`)
        res.status(201).json(newPerson)
      })
      .catch(() => {
        res.status(500).json({ error: 'Server error' })
      })
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).send(result)
    })
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const id = req.params.id
  const updatedPerson = { ...req.body }
  Person.findByIdAndUpdate(id, updatedPerson, { new: 'true' })
    .then((result) => {
      res.status(202).send(result)
    })
    .catch((error) => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Iniciado en puerto ${PORT}`)
})
