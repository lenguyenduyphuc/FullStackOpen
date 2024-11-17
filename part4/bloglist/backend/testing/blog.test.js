const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const helper = require('./test_helper')

const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
    //create root user
    await User.deleteMany({})
    //Create Blog without user
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {
    let headers

    beforeEach(async () => {
        const newUser = {
            username: 'root',
            name: 'root',
            password: 'root'
        }

        await api
            .post('/api/users')
            .send(newUser)

        const result = await api
            .post('/api/login')
            .send(newUser)

        headers = {'Authorization': `Bearer ${result.body.token}`}
    })
    
    
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .set(headers)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('the unique identifier property of the blog posts is named id', async () => {
        const blogsAtStart = await helper.blogsInDb()
    
        const blogToView = blogsAtStart[0]
    
        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .set(headers)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        assert.deepStrictEqual(resultBlog.body, blogToView)
    })
})


describe('Adding new blogs', () => {
    let headers

    beforeEach(async () => {
        const newUser = {
            username: 'root',
            name: 'root',
            password: 'root'
        }

        await api
            .post('/api/users')
            .send(newUser)

        const result = await api
            .post('/api/login')
            .send(newUser)

        headers = {'Authorization': `Bearer ${result.body.token}`}
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
            .set(headers)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    })
    
    test('Check the like property of the blogs', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const newBlog = {
            _id: "5a422bc61b54a676234d17fc",
            title: "Breh wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        }
    
        await api
            .post('/api/blogs')
            .set(headers)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length + 1)
    
        const blogs = blogsAtEnd.find(r => r.title === newBlog.title)
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
            .set(headers)
            .send(newBlog)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

describe('Update a blog', () => {
    let headers

    beforeEach(async () => {
        const newUser = {
            username: 'root',
            name: 'root',
            password: 'root'
        }

        await api
            .post('/api/users')
            .send(newUser)

        const result = await api
            .post('/api/login')
            .send(newUser)

        headers = {'Authorization': `Bearer ${result.body.token}`}
    })

    test('Updated a new note', async () => {
    
        const newBlog = {
            title:"Masterpiece",
            author:"Edsger W. Dijkstra",
            url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes:12
          }
      
        await api
            .post('/api/blogs')
            .set(headers)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
         
        const blogsAtStart = await helper.blogsInDb()
        const blogsToUpdate = blogsAtStart.find(blog => blog.url ===  newBlog.url)

        const updatedBlog = {
            ...blogsToUpdate,
            likes: blogsToUpdate.likes + 1
        }

        await api
            .put(`/api/blogs/${blogsToUpdate.id}`)
            .set(headers)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)

        const blog = blogsAtEnd.find(blog => blog.url === newBlog.url)
        assert.strictEqual(blog.likes, newBlog.likes + 1)
    })
})

describe('Deletion of blogs and updated blogs', () => {
    let headers

    beforeEach(async () => {
        const newUser = {
            username: 'root',
            name: 'root',
            password: 'root'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const result = await api
            .post('/api/login')
            .send(newUser)

        headers = {'Authorization': `Bearer ${result.body.token}`}
    })

    test('Delete a single blog', async () => {
        const newBlog = {
            title:"The best blog ever",
            author:"Me",
            url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes:12
        }
      
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
            .expect(201)
            .expect('Content-Type', /application\/json/)
      
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart.find(blog => blog.title === newBlog.title)
        
        console.log('Headers:', headers)
        console.log('Blog to delete:', blogToDelete)

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set(headers)
            .expect(204)
      
        const blogsAtEnd = await helper.blogsInDb()
      
        assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
    
        const contents = blogsAtEnd.map(r => r.title)
        assert(!contents.includes(blogToDelete.title))
    })
})

after(async () => {
    await mongoose.connection.close()
})