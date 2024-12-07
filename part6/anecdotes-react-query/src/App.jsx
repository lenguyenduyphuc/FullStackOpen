import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, updatedAnecdote } from './requests'
import { useNotificationDispatch } from './NotificaitionContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const updatedAnecdoteMutation = useMutation({ 
    mutationFn: updatedAnecdote,
    onSuccess: (votedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], 
        (oldData) => oldData.map(anecdote =>
          anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote
        )
      )
    }
  })

  const handleVote = (anecdote) => {
    updatedAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'SET_NOTIFICATION', 
      payload: `You voted for "${anecdote.content}"`
    })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false
  })

  if (result.isLoading){
    return <div>loading data...</div>
  }

  if (result.isError){
    return <div>anecdote service not available due to problems in the server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {handleVote(anecdote)}}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App