import {useState} from 'react'

const Header = ({name}) => {
    console.log(name)
    return (
        <h2>{name}</h2>
    )
}

const Anecdotes =({text, votesCount}) =>{
    console.log(text, votesCount )
    return (
        <div>
            <p>{text}</p>
            <p>{votesCount}</p>
        </div>
    )
}




const Winner = ({anecdotes, allVotes}) => {
    console.log(anecdotes, allVotes)
    const highestVoteCount = Math.max(...allVotes)
    const winnerIndex = allVotes.indexOf(highestVoteCount)
    const winner = anecdotes[winnerIndex]
    if (highestVoteCount === 0){
        return (
            <p>No votes yet</p>
        )
    }
    return (
        <div>
            <p>{winner}</p>
            <p>has {highestVoteCount} votes</p>
        </div>
    )
}

const Button = ({onClick, text}) => {
    return (
        <button onClick={onClick}>
            {text}
        </button>
    )
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
    
    const [selected, setSelected] = useState(0)
    //Vote for each sentence, initialize with 0
    const [allVotes, setAllVotes] = useState(Array(anecdotes.length).fill(0))

    const handleVoteClick = () => {
        const newAllVotes = [...allVotes]
        newAllVotes[selected] += 1
        setAllVotes(newAllVotes)
    }

    const handleAnecdoteClick = () => {
        const arrayIndex = Math.floor(Math.random() * anecdotes.length)
        setSelected(arrayIndex)
    }

    return (
        <div>
            <Header name="Anecdote of the day" />
            <Anecdotes text={anecdotes[selected]} votesCount={allVotes[selected]}/>
            <Button onClick={handleVoteClick} text={"Vote"}/>
            <Button onClick={handleAnecdoteClick} text={"Next anecdote"} />

            <Header name="Anecdote with the most votes"/>
            <Winner anecdotes={anecdotes} allVotes={allVotes}/>
        </div>
    )
}

export default App