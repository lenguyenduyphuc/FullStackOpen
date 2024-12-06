import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`you added '${content}'`, 10))
	}

  return (
    <form onSubmit={addAnecdote}>
      <h2>create new</h2>
      <div><input name='anecdote'/></div>
      <button>create</button>
    </form>
  )
}

export default AnecdoteForm