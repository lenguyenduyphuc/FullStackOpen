import axios from 'axios'
import { voteAnecdote } from '../../anecdotes/src/reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3005/anecdotes'
export const getAll = () => 
  axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote =>
  axios.post(baseUrl, newAnecdote).then(res => res.data)

export const updatedAnecdote = anecdote => 
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then(res => res.data)