import { configureStore } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import anecdoteReducer, { setAnecdotes } from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'
import notificationReducer from '../reducers/notificationReducer'

const store = configureStore({
	reducer: {
		anecdotes: anecdoteReducer,
		filter: filterReducer,
		notification: notificationReducer 
	}
})

anecdoteService.getAll().then(notes => {
	store.dispatch(setAnecdotes(notes))
})

export default store