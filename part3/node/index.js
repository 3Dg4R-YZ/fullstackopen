const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

let persons = [
	{
		name: 'Arto Hellas',
		number: '040-123456',
		id: 1,
	},
	{
		name: 'Ada Lovelace',
		number: '39-44-5323523',
		id: 2,
	},
	{
		name: 'Dan Abramov',
		number: '12-43-234345',
		id: 3,
	},
	{
		name: 'Mary Poppendieck',
		number: '39-23-6423122',
		id: 4,
	},
]

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

app.get('/', (req, res) => {
	res.send('<h1>Hola Mundo</h1>')
})

app.get('/info', (req, res) => {
	let HTML = `<p>Phonebook has info for ${persons.length} people</p>`
	HTML += `<p>${new Date()}</p>`
	res.send(HTML)
})

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find((person) => person.id === id)
	if (person) return res.json(person)
	res.status(404).end()
})

app.post('/api/persons', (req, res) => {
	const newPerson = { ...req.body, id: Math.floor(Math.random() * 100000) }
	if (!newPerson.name || !newPerson.number) {
		return res.status(400).json({ error: 'content missing' })
	}
	if (
		persons.find(
			(person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
		)
	) {
		return res.status(400).json({ error: 'name must be unique' })
	}
	persons = persons.concat(newPerson)
	res.json(persons)
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const prevLength = persons.length
	persons = persons.filter((person) => person.id !== id)
	if (prevLength !== persons.length) res.status(204).end()
	res.status(404).end()
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Iniciado en puerto ${PORT}`)
})
