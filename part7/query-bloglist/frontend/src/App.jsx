import { useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import './App.css'

const App = () => {
  const queryClient = useQueryClient()
  
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getAll
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      const loggedUser = dispatch(loginUser(user))
      if (loggedUser) {
        blogService.setToken(loggedUser.token)
      }
    }
  }, [])

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
    }
  })

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
    const user = await dispatch(loginUser(credentials))
    if (user) { 
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch(createNotification(`${user.username} logged in`))
      blogService.setToken(user.token) 
    }
  } catch (exception) {
    dispatch(createNotification('Error: Wrong username or password'))
  }
}

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(loginUser(null))
    window.localStorage.removeItem('loggedBlogappUser')
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