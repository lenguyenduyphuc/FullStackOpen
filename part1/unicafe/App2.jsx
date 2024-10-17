import {useState} from 'react'
const Header = ({name}) => {
    console.log(name)
    return <h1>{name}</h1>

}

const Part = ({part}) =>{
    return <p>{part}</p>
}
const Button = (props) => {
    return (
    <button onClick = {props.handleClick}> 
        {props.text}
    </button>
    )
}


const App2 = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
  
    return (
      <div>
        <Header name="give feedback"/>
        <Button handleClick = {() => setBad(bad + 1)} text = "good"/>
        <Button handleClick ={() => setGood(good + 1)} text = "neutral"/>
        <Button handleClick ={() => setNeutral(neutral+1)} text= "bad"/>
        <Header name="statistics"/>
        <div>
            <div>good {good}</div>
            <div>neutral {neutral}</div>
            <div>bad {bad}</div>
        </div>
      </div>
    )
  }
  
  export default App2