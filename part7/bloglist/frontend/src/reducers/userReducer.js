import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'

const userSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    appendUsers(state, action) {
      state.push(action.payload)
    },
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const loginUser = (credentials) => {
  return async dispatch => {
    if (credentials === null) {
      dispatch(setUsers(null))
      return null
    }
    const user = await loginService.login(credentials)
    dispatch(setUsers(user))
    return user
  }
}

export const { appendUsers, setUsers } = userSlice.actions
export default userSlice.reducer