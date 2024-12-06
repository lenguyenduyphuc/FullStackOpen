import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = () => {
    console.log(anecdote)
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={vote}>vote</button>
      </div>
    </div>
  )
}
const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === null){
      return state.anecdotes
    }
    else {
      const regex = new RegExp(state.filter, 'i')
      const newFilter = state.anecdotes.filter((anecdote) => anecdote.content.match(regex))
      return newFilter
    }
  })

  const byVotes = (a,b) => b.votes - a.votes
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {[...anecdotes].sort(byVotes).map(anecdote =>
         <Anecdote key={anecdote.id} anecdote={anecdote} id={anecdote.id} />
      )}
    </div>
  )
}

export default AnecdoteList