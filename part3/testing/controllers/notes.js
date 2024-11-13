const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

notesRouter.get('/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

notesRouter.post('/', async (request, response, next) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
  
})

notesRouter.get('/:id', async (request, response, next) => {
		const note = await Note.findById(request.params.id)
		if (note) {
			response.json(note)
		} else {
			response.status(204).end()
		}
})

notesRouter.delete('/:id', async () => {
		await Note.findByIdAndDelete(request.params.id)
		response.status(204).end()
})
module.exports = notesRouter