const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

const Blog = require('./models/blog')


app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

app.delete('/api/blogs/:id', (request, response))

const PORT = 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})