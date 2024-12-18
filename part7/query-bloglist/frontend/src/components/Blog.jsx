import { useMutation } from '@tanstack/react-query' 
import { useTogglable } from '../hooks/hooks'
import { update } from '../services/blogs'

const Blog = ({blog, updatedBlog, removedBlog, currentUser}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid', 
    borderWidth: 1,
    marginBottom: 5
  }

  const togglable = useTogglable()

  const hideWhenVisible = { display: togglable.value ? 'none' : '' }
  const showWhenVisible = { display: togglable.value ? '' : 'none' }

  const updateBlogMutation = useMutation({
    mutationFn: update,
    onSucess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
    }
  })

  const updateBlog = (event) => {
    event.preventDefault()
    updateBlogMutation.mutation({ ...blog, likes: blog.like + 1})
  }

  const removeBlog = () => {
   removedBlog(blog)
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