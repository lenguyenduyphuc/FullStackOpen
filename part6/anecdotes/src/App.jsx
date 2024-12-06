import { useEffect } from 'react'
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import FilterAnecdote from "./components/AnecdoteFilter"
import Notification from "./components/Notification"
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
    .getAll().then(notes => 
      dispatch(setAnecdotes(notes))
    )
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <FilterAnecdote />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App