import { useEffect, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { getBlogs } from './services/blogs'
import { NotificationContext, AuthContext }  from './reducers/Context'
import './App.css'

const App = () => {
  const [user, userDispatch] = useContext(AuthContext)
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const result = useQuery({ 
    queryKey: ['blogs'], 
    queryFn: getBlogs,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET_USER', payload: user })
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    userDispatch({ type: 'CLEAR_USER' })
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    notificationDispatch({ type: 'SET_NOTIFICATION', payload: 'Logged out successfully' })
    setTimeout(() => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notification} />
      {user === null ? (
        <LoginForm/>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Log out</button>
          <Togglable buttonLabel="Create new blog">
            <BlogForm />
          </Togglable>
          {[...blogs]
            .sort((a, b) => b.likes - a.likes)
            .map(blog => 
              <Blog key={blog.id} blog={blog} currentUser={user} />
            )}
        </div>
      )}
    </div>
  )
}

export default App