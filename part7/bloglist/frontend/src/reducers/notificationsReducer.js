import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    setNotifications(state, action) {
      return action.payload
    }
  }
})

export const createNotification = content => {
  return async dispatch => {
    dispatch(setNotifications(content))
  }
}

export const { setNotifications } = notificationSlice.actions

export default notificationSlice.reducer