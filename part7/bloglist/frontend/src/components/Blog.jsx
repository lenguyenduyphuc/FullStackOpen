import { useState } from 'react'

const Blog = ({blog, updatedBlog, removedBlog, currentUser}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlog = (event) => {
    event.preventDefault()
    const updatedBlogObject = ({
      ...blog,
      likes: blog.likes + 1,
    })
    updatedBlog(updatedBlogObject)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removedBlog(blog)
    }
  }
  const canDeleteBlog = currentUser && blog.user && currentUser.username === blog.user.username

  const [visible, setVisible] = useState(true) 

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>View</button>
      </div>
      <div style={showWhenVisible} className='blog'>
        <div data-testid='blogs' style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(false)}>Hide</button>
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