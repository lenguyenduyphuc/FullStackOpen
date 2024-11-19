import { useState } from 'react'

const Blog = ({blog, updatedBlog, removedBlog, user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlog = () => {
    const updatedBlogObject = ({
      ...blog,
      likes: blog.likes + 1,
      user: blog.user
    })
    updatedBlog(updatedBlogObject)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      removedBlog(blog)
    }
  }

  const isOwner = blog.user && user && blog.user.id === user.id

  const [visible, setVisible] = useState(true) 

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none'}

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setVisible(true)}>View</button>
      </div>
      <div style={showWhenVisible}>
        <div style={blogStyle}>
          {blog.title} {blog.author}
          <button onClick={() => setVisible(false)}>Hide</button>
          <br/>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a> <br/>
          {blog.likes}
          <button onClick={updateBlog}>Like</button><br/>
          <button onClick={removeBlog}>Delete</button><br/>
          {isOwner && (
            <span>{user.name}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Blog