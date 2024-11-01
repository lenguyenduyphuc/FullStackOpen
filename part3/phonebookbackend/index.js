require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors =  require('cors')

const Person = require('./models/phonebook')

let persons = []

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

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


//get the persons info from the database
app.get('/info', (request, response) => {
  const currentDate = new Date().toLocaleString()
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  Person.find({}).then(persons => {
    response.send(
      `
      <div>
        <p>Phonebook has info for ${persons.length} people</p>
      </div>
      <div>
          <p>${currentDate} (${timeZone})</p>
      </div>`
    )
  })
})

//get the persons from the database
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
  .then(person => {
    if (person){
      response.json(person.toJSON())
    }
    else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
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
  }

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
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
  
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})