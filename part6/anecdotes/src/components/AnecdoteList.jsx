import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { hideNotification, voteNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  const vote = () => {
    dispatch(voteAnecdote(anecdote))
    dispatch(voteNotification(anecdote))
    setTimeout(() => {
      dispatch(hideNotification(null));
    }, 5000);
  }
  console.log((anecdote))

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
         <Anecdote key={anecdote.id} anecdote={anecdote} />
      )}
    </div>
  )
}

export default AnecdoteList