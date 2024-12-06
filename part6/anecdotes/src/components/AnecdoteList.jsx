import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { hideNotification, voteNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (id, content) => {
    console.log('vote', id)
    console.log('vote', content)
    dispatch(voteAnecdote(id))
    dispatch(voteNotification(content))
    setTimeout(() => {
      dispatch(hideNotification(null));
    }, 5000);
  }

  const anecdotes = useSelector(state => {
    if ( state.filter === null){
      return state.anecdotes
    }
    else {
      const regex = new RegExp(state.filter, 'i')
      const newFilter = state.anecdotes.filter((anecdote) => anecdote.content.match(regex))
      console.log(newFilter)
      return newFilter
    }
  })
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {[...anecdotes].sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList