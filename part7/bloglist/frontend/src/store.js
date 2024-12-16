import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationsReducer'
const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer
  }
})

export default store