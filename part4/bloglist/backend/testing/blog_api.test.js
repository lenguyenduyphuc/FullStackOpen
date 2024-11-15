const { test, after, expect, beforeEach} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const Blog = require('../models/blog')



beforeEach(async () => {
    //Create blogs without user
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('the unique identifier property of the blog posts is named id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, blogToView)
})

test('Successfully create a new blog post', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

test('Check the like property of the blogs', async () => {
    const newBlog = {
        _id: "5a422bc61b54a676234d17fc",
        title: "Breh wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const blogs = blogsAtEnd.find(r => r.title === "Breh wars")
    assert.deepStrictEqual(blogs.likes, 0)
})

test('Check the title or url properties', async () => {
    const newBlog = {
        _id: "035313233633",
        title: "Testing title and url",
        likes: 5
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})

test('Delete a single blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(r => r.id)
    assert(!contents.includes(blogToDelete.id))
})

test('Updated a new note', async () => {

    const updatedBlog = {
        _id: "5a422ba71b54a676234d17fb",
        title: "It is a good thing",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    }

    await api
        .put(`/api/blogs/${updatedBlog._id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

})

after(async () => {
    await mongoose.connection.close()
})