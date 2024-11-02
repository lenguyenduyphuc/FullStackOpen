const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config();
const morgan = require('morgan')
const Person = require('./models/person')

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

const unknownEndpoint = (request, response) => {
  response.status(400).send({error: 'unknown endpoint'})
}

//get the persons info from the database
app.get('/info', (request, response) => {
  const currentDate = new Date().toLocaleString()
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  Person.find({}).then(person => {
    response.send(
      `
      <div>
        <p>Phonebook has info for ${person.length} people</p>
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

  Person.findByIdAndDelete(request.params.id)
  .then(() => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

//add person name
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const personName = body.name
  const personNumber = body.number
  
  if (Object.keys(body).length === 0){
    return response.status(400).json({
      error: "missing-content"
    })
  }

  if (persons.find(person => person.name === body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = new Person ({
    name: personName,
    number: personNumber
  })

  person.save()
  .then(savedPerson => savedPerson.toJSON())
  .then(savedAndFormattedPerson => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    response.json(savedAndFormattedPerson)
  })
  .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === "CastError"){
    return response.status(400).send({error: "Malformatted ID"})
  } else if (error.name === "ValidationError"){
    return response.status(400).send({error: error.message})
  }
  next(error)
}

app.use(errorHandler)
app.use(unknownEndpoint) 


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})