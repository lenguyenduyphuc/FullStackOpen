import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const [createVisible, setCreateVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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
    setUsername('')
    setPassword('')
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewAuthor('')
        setNewTitle('')
        setNewUrl('')
        setErrorMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type='submit'>Log out</button>
    </form>
  )

  const createBlogForm = () => {
    const hideWhenVisible = { dispplay : createVisible ? 'none' : ''}
    const showWhenVisible = { display : createVisible ? '' : 'none'}

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>Create</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm 
            newTitle={newTitle}
            newAuthor={newAuthor}
            newUrl={newUrl}
            handleTitleChange={({ target }) => setNewTitle(target.value)}
            handleAuthorChange={({ target }) => setNewAuthor(target.value)}
            handleUrlChange={({ target }) => setNewUrl(target.value)}
            handleCreateBlog={handleCreateBlog}
          />
          <button onClick= {() => setCreateVisible(false)}>Cancel create blogs</button>
        </div>
      </div>
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
          {blogs.map(blog => 
            <Blog key={blog.id} blog={blog}/>
          )}
        </div>
      }
    </div>
  )
}

export default App