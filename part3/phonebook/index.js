const express = require('express')
const app = express()
const morgan = require('morgan')

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person){
    response.json(person)
  }
  else {
    response.json(400).end()
  }
})

app.get('/info', (request, response) => {
  const number = persons.length
  const date = new Date()
  response.send(`
    <p>Phone book has info for ${number} people</p>
    <p>${date}</p>
    `)
})

//delete a person
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.json(204).end()
})

//add person name
app.post('/api/persons', (request, response) => {
  const body = request.body
  const personName = body.name
  const personNumber = body.number
  
  if (!personName || !personNumber){
    return response.status(400).json({
      error: "missing-content"
    })
  }

  if (persons.find(person => person.name === body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }


  const person = {
    name: personName,
    number: personNumber,
    id: Math.floor(Math.random() * 1000000)
  }

  persons = persons.concat(person)
  response.json(person)
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === "CastError"){
    return response.status(400).send({error: "Malformatted ID"})
  } else if (error.name = "ValidationError"){
    return response.status(400).send({error: error.message})
  }
  next(error)
}

app.use(errorHandler)
  
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})