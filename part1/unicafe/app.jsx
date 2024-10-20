import './style.css'
import {useState} from 'react'

const Header = (props) => (
    <h1>{props.name}</h1>
)

const Statistics = (props) => {
    const sum = props.good + props.neutral + props.bad
    const average = (props.good *1 + props.bad*-1) / sum
    const positive = `${parseFloat(props.good/sum)*100}%`
    if (sum === 0){
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }
    return (
        <table>
            <tbody>
                <StatisticsLine text='good' value={props.good}/>
                <StatisticsLine text='neutral' value={props.neutral} />
                <StatisticsLine text='bad' value={props.bad}/>
                <StatisticsLine text='average' value={average} />
                <StatisticsLine text='positive' value ={positive} />
            </tbody>
        </table>
    )
}



const StatisticsLine = (props) => {
    return (
        <tr>
            <td>{props.text}</td>
            <td>{props.value}</td>
        </tr>
    )
}

const Button = (props) => {
    return (
        <div>
            <button onClick={props.handleClick}>
                {props.text}
            </button>
        </div>
    )
}
const App = () => {

    //save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }
    return (
        <div>
            <Header name='Customer feedback'/>
            <Button handleClick={handleGoodClick} text='good'/>
            <Button handleClick={handleNeutralClick} text='neutral'/>
            <Button handleClick={handleBadClick} text='bad'/>
            <Header name='Statistic' />
            <Statistics good ={good} bad={bad} neutral={neutral}/>
        </div>
    )
}

export default App;