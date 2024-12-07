import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useNotificationDispatch } from "../NotificaitionContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation =  useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (content.length < 5) {
      dispatch({type: 'SET_NOTIFICATION', payload: `too short anecdote, must have length 5 or more`})
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
      return
    }
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm