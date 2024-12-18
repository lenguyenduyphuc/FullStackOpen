const supertest = require('supertest')
const mongoose = require('mongoose')
const { test, describe, after, beforeEach } = require('node:test')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const assert = require('assert')

const Blog = require('../models/blog')
const User = require('../models/user')

const testUser = {
  username: "testuser",
  name: "Test User",
  password: "password"
}

let token

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    await api
      .post('/api/users')
      .send(testUser)

    const response = await api
      .post('/api/login')
      .send(testUser)

    token = response.body.token
  })

  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs are returned with id property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      assert(blog.id)
    })
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "http://example.com/new",
      likes: 5
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .set('Authorization', `Bearer ${token}`)
  
    assert.strictEqual(postResponse.body.title, newBlog.title)
    assert.strictEqual(postResponse.body.author, newBlog.author)
    assert.strictEqual(postResponse.body.url, newBlog.url)
    assert.strictEqual(postResponse.body.likes, newBlog.likes)
  
    await api.get('/api/blogs')

    const blogsAtEnd = await helper.blogsInDb()
  
    const titles = blogsAtEnd.map(blog => blog.title)

    assert(titles.includes('New Blog'))
  })

  test('if likes property is missing, it will default to 0', async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "http://example.com/new",
    }
  
    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(postResponse.body.likes, 0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: "New Author",
      url: "http://example.com/new",
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a valid blog is not added without a token', async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "http://example.com/new",
      likes: 5
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a blog can be deleted', async () => {
    const blogToDelete = {
      title: "New Blog",
      author: "New Author",
      url: "http://example.com/new",
      likes: 5
    }

    const response = await api
      .post('/api/blogs')
      .send(blogToDelete)
      .set('Authorization', `Bearer ${token}`)

    const id = response.body.id

    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  
    const titles = blogsAtEnd.map(r => r.title)
  
    assert(!titles.includes(blogToDelete.title))
  })

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
  
    const newBlog = {
      title: "Updated Blog",
      author: "Updated Author",
      url: "http://example.com/updated",
      likes: 10
    }
  
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
  
    const blogsAtEnd = await helper.blogsInDb()
  
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
  
    assert.strictEqual(updatedBlog.title, newBlog.title)
    assert.strictEqual(updatedBlog.author, newBlog.author)
    assert.strictEqual(updatedBlog.url, newBlog.url)
    assert.strictEqual(updatedBlog.likes, newBlog.likes)
  })

  after(async () => {
    mongoose.connection.close()
  })
})