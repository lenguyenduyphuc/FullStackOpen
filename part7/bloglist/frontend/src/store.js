import { configureStore } from '@reduxjs/toolkit'

import blogReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationsReducer'
import userReducer from './reducers/userReducer'
const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer
  }
})

export default store