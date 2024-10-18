import {useState} from 'react'

const Button = ({handleClick, text}) => {
    return (
    <button onClick = {handleClick}> 
        {text}
    </button>
    )
}


const getRandomInt =(max) =>{
    return Math.floor(Math.random() * max)
}

const handleVote = (votes, selected, setVotes) =>{
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
}

const findMostVotes = (votes) =>{
    const maxVotes = Math.max(...votes)
    const mostVotedIndex = votes.indexOf(maxVotes)
    return mostVotedIndex
}


const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
      ]
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
      //handle selected
    const [selected, setSelected] = useState(0)


    const mostVotedIndex = findMostVotes(votes)
    
    return (
        <div>
            <h2>Anecdote of the day</h2>
            <p>{anecdotes[selected]}</p>
            <p>has {votes[selected]} votes</p>
            <div>
                <Button handleClick={() => setSelected(getRandomInt(anecdotes.length))} text="next anecdote"/>
                <Button handleClick={() => handleVote(votes, selected, setVotes)} text="vote"/>
            </div>

            <h2>Anecdote with most votes</h2>
            <p>{anecdotes[mostVotedIndex]}</p>
            <p>has {votes[mostVotedIndex]}</p>
        </div>
    )
}

export default App