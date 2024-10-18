import {useState} from 'react'
const Header = ({name}) => {
    console.log(name)
    return <h1>{name}</h1>

}

const Button = ({handleClick, text}) => {
    return (
    <button onClick = {handleClick}> 
        {text}
    </button>
    )
}

const StatisticsLine = ({text, value}) =>{
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    )
}

const Statistics = ({good, bad, neutral, positive, average, total}) =>{
    if (total === 0) return <div>No feedback given</div>
    return (
        <table>
            <tbody>
                <StatisticsLine text="good" value={good}/>
                <StatisticsLine text="bad" value ={bad}/>
                <StatisticsLine text="neutral" value={neutral}/>
                <StatisticsLine text="all" value={total}/>
                <StatisticsLine text="average" value={average}/>
                <StatisticsLine text="positive" value={positive}/>
            </tbody>
        </table>
    )
}


const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    let total = 0

    total = good + bad +neutral
    let average = 0, positive = 0

    if (total === 0){
        average = 0
        positive = 0
    }
    else {
        average = (good*1 + bad*-1) / total
        positive = ((good) / (total)) * 100
    }
  
    return (
      <div>
        <Header name="give feedback"/>
        <Button handleClick ={() => setGood(good + 1)} text = "good"/>
        <Button handleClick ={() => setNeutral(neutral + 1)} text= "neutral"/>
        <Button handleClick = {() => setBad(bad + 1)} text = "bad"/>
        <Header name="statistics"/>
        <Statistics bad={bad} average={average} total={total} good={good} neutral={neutral} positive={positive} />
      </div>
    )
  }
  
  export default App