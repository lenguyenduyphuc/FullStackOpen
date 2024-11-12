const Note = require('../models/note')


//database notes
const initialNotes = [
    {
      content: 'HTML is easy',
      important: false
    },
    {
      content: 'Browser can execute only JavaScript',
      important: true
    }
]

//create database object
const nonExistId = async () => {
    const note = new Note({ content: 'willremovethissoon'})
    await note.save()
    await note.deleteOne()

    return  note._id.toString()
}

//check note store in dababase
const notesInDb = async () => {
    const notes = await Note.find({})

    return notes.map(note => note.toJSON())
}

module.exports = {
    initialNotes, nonExistId, notesInDb
}