import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  const anecdotes = useSelector(({ filter, anecdotes})=> {
    if ( filter === null){
      return anecdotes
    }
    else {
      const regex = new RegExp(filter, 'i')
      console.log(regex)
      const newFilter = anecdotes.filter((anecdote) => anecdote.content.match(regex))
      return newFilter
    }
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList