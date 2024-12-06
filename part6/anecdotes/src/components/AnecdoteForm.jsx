import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { createNotification, hideNotification } from '../reducers/notificationReducer'
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.create(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(hideNotification(null));
    }, 5000);
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