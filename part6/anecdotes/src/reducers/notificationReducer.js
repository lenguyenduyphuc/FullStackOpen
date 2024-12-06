import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
		setNotification(state, action){
			return action.payload
		},
    clearNotification() {
      return null
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const notification = (content, time) => {
  return async dispatch => {
    dispatch(setNotification(content))
    setTimeOut(() => {
      dispatch(clearNotification())
    }, time)
  }
}
export default notificationSlice.reducer