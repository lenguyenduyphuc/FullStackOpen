import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const anecdoteReducer = (state = initialState, action) => {
//   switch(action.type){
//     case 'NEW_ANECDOTE': {
//       return [...state, action.payload]
//     }
//     case 'ADD_VOTE': {
//       const id = action.payload.id
//       const voteToChange = state.find(vote => vote.id === id)
//       const changeAnecdote = {
//         ...voteToChange,
//         votes: voteToChange.votes + 1
//       }
//       return state.map(vote => 
//         vote.id !== id ? vote : changeAnecdotes
//       )
//     }
//     default:
//       return state 
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action){
      const id = action.payload.id 
      const voteToChange = state.find(vote => vote.id === id)
      const changedAnecdote = {
        ...voteToChange,
        votes: voteToChange.votes + 1
      }
      return state.map(vote =>
        vote.id !== id ? vote : changedAnecdote
      )
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

// export const voteAnecdote = (id) => {
//   return {
//     type: 'ADD_VOTE',
//     payload: { id }
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//       votes: 0,
//       id: getId(),
//     }
//   }
// }

export const { voteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initilizeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    console.log(anecdotes)
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  console.log(content)
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export default anecdoteSlice.reducer