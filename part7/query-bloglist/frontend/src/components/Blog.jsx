import { useMutation, useQueryClient} from '@tanstack/react-query' 
import { useTogglable } from '../hooks/hooks'
import { updateBlogs, removeBlogs } from '../services/blogs'
import { useContext } from 'react'
import { NotificationContext} from '../reducers/Context'

const Blog = ({ blog, currentUser }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext)
  const togglable = useTogglable()
  const queryClient = useQueryClient()

  const hideWhenVisible = { display: togglable.value ? 'none' : '' }
  const showWhenVisible = { display: togglable.value ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid', 
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlogMutation = useMutation({
    mutationFn: updateBlogs,
    onSuccess: (updatedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `Blog ${updatedBlog.title} has been liked` })
      setTimeout(() => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    },
    onError: (updatedBlog) => {
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: `Blog ${updatedBlog.title} has been liked` })
      setTimeout(() => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    }
  })

  const updateBlog = (event) => {
    event.preventDefault()
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const deleteBlogMutation = useMutation({
    mutationFn: removeBlogs,
    onSuccess: (removedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: 'Error The blog has already been removed'})
      setTimeout(() => notificationDispatch({ type: 'CLEAR_NOTIFICATION' }), 5000)
    }
  })

  const removeBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlogMutation.mutate(blog.id)
    }
  }
  
  const canDeleteBlog = currentUser && blog.user && currentUser.username === blog.user.username

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={togglable.toggle}>View</button>
      </div>
      <div style={showWhenVisible} className='blog'>
        <div data-testid='blogs' style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={togglable.toggle}>Hide</button>
          <br/>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a> <br/>
          {blog.likes}
          <button onClick={updateBlog}>Like</button><br/>
          {canDeleteBlog ? (
            <>
              {blog.user.name}
              <button onClick={removeBlog}>Delete</button><br/>
            </>
          ) : (
            "Unknown user"
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog