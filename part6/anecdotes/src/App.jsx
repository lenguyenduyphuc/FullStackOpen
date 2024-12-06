import { useEffect } from "react"
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import FilterAnecdote from "./components/AnecdoteFilter"
import Notification from "./components/Notification"
import { useDispatch } from 'react-redux'
import { initilizeAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initilizeAnecdote())
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