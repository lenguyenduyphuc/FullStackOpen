import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    console.log(event)
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
	}

  return (
    <form onSubmit={addAnecdote}>
      <div><input name='anecdote'/></div>
      <button>create</button>
    </form>
  )
}

export default NewAnecdote