const express = require('express')
const app = express()

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

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n =>Number(n.id)))
    : 0
  return String(maxId + 1)
}

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

  if (!body.name || !body.number){
    return response.json(400).end({
      error: "missing content"
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000000)
  }

  persons = persons.concat(person)
  response.json(person)
})


  
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})