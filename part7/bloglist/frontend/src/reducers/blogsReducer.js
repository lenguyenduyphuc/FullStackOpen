import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    toggleVisibilityOf(state, action) {
      const id = action.payload
      const blogToChange = state.find(n => n.id === id)
      const changedBlog = {
        ...blogToChange,
        visibility: !blogToChange.visibility
      }

      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updatedBlog(state, action) {
      return state.map(blog =>
        blog.id === action.payload.id ? action.payload : blog
      )
    },
    removedBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const updateBlog = content => {
  return async dispatch => {
    const blogToUpdate = await blogService.update(content)
    dispatch(updatedBlog(blogToUpdate))
    return updatedBlog
  }
}

export const removeBlog = blogId => {
  return async dispatch => {
    await blogService.remove(blogId)
    dispatch(removedBlog(blogId))
  }
}

export const { toggleVisibilityOf, setBlogs, appendBlog, updatedBlog, removedBlog} = blogSlice.actions

export default blogSlice.reducer