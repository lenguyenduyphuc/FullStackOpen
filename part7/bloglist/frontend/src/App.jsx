import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

import { initializeBlogs } from './reducers/blogsReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  
  blogs = useSelector(state => state.blogs)
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  console.log(blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const createBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updateBlog = (objectToUpdate) => {
    blogService
      .update(objectToUpdate)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id === returnedBlog.id ? returnedBlog : blog))
        setErrorMessage(`blog ${returnedBlog.title} has been liked `)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Error updating blog: ${error.message}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const removeBlog = (objectToDelete) => {
    if (window.confirm(`Remove blog ${objectToDelete.title} by ${objectToDelete.author}`)){
      blogService
      .remove(objectToDelete.id)
      .then(()=> {
        setBlogs(blogs.filter(blog => blog.id !== objectToDelete.id))
        setErrorMessage(`blog ${objectToDelete.title} has been deleted`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(`Error deleting blog: You are not the creator`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }

  const createBlogForm = () => {
    return (
      <Togglable buttonLabel='new blog'>
        <div>
          <BlogForm createBlog={createBlog}/>
        </div>
      </Togglable>
    )
  }

  const handleLogin = async (credentials) => {

    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setErrorMessage('Error: Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }


  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type='submit'>Log out</button>
    </form>
  )

  const loginForm = () => {
   return (
    <Togglable buttonLabel='login'>
      <div>
        <LoginForm createLogin = {handleLogin}/>
      </div>
    </Togglable>
   )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage}/>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} log in </p>
          {logoutForm()}
          {createBlogForm()}
          {blogs.sort((a,b) => b.likes - a.likes).map(blog => 
            <Blog key={blog.id} updatedBlog={updateBlog} removedBlog={removeBlog} currentUser={user}/>
          )}
        </div>
      }
    </div>
  )
}

export default App