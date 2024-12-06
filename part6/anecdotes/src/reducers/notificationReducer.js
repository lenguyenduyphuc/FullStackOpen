import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
		createNotification(state, action){
			return `you created ${action.payload}`
		},
    voteNotification(state, action){
      return `you voted ${action.payload}`
    },
    hideNotification() {
      return null
    }
  }
})

export const { createNotification, voteNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer