import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

import { initializeBlogs, createBlog, updateBlog, removeBlog} from './reducers/blogsReducer'
import { createNotification } from './reducers/notificationsReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const errorMessage = useSelector(state => state.notification)
  
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleCreateBlog = (blogObject) => {
    const newBlog = dispatch(createBlog(blogObject))
    dispatch(createNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`))
    setTimeout(() => dispatch(createNotification(null)), 5000)
  }

  const handleUpdateBlog = (blogToUpdate) => {
    try {
      dispatch(updateBlog(blogToUpdate))
      dispatch(createNotification(`blog ${blogToUpdate.title} has been liked`))
    } catch (error) {
      dispatch(createNotification(`Error updating blog: ${error.message}`))
      setTimeout(() => dispatch(createNotification(null)), 5000)
    }
  }

  const handleRemoveBlog = (blogToRemove) => {
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
      try {
        dispatch(removeBlog(blogToRemove.id))
        dispatch(createNotification(`blog ${blogToRemove.title} has been deleted`))
        setTimeout(() => dispatch(createNotification(null), 5000))
      } catch (error) {
        dispatch(createNotification(`Error deleting blog: ${error.message}`))
        setTimeout(() => dispatch(createNotification(null)), 5000)
      }
    }
  }

  const createBlogForm = () => {
    return (
      <Togglable buttonLabel='new blog'>
        <div>
          <BlogForm createBlog={handleCreateBlog}/>
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
      dispatch(createNotification('Error: Wrong username or password'))
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
          {[...blogs].sort((a,b) => b.likes - a.likes).map(blog => 
            <Blog key={blog.id} blog={blog} updatedBlog={handleUpdateBlog} removedBlog={handleRemoveBlog} currentUser={user}/>
          )}
        </div>
      }
    </div>
  )
}

export default App