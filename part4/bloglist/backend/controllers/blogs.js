const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if (blog){
        response.json(blog)
    } else {
        response.status(404).end()
    }
})


blogsRouter.post('/', async (request, response) => {
    const user = request.user
    const body = request.body
    
    if (!body.title || !body.url){
        return response.status(400).json({ error: 'Title or URL missing' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id)
    const user = request.user

    if ( blogToDelete.user.toString() === user.id.toString()){
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    }
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body 

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true})
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter