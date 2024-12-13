import React from 'react'

class App extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      anecodes: [],
      current: 0
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:3001/anecdotes').then(response => 
      this.setState({ anecodes: response.data})
    )
  }
  
  handleClick = () => {
    const current = Math.floor(
      Math.random() * this.state.anecdotes.length
    )
    this.setState({ current })
  }

  render() {
    if (this.state.anecodes.length === 0){
      return <div>no anecodotes...</div>
    }
    return (
      <div>
        <h1>Anecdote of the day</h1>
        <div>
          {this.state.anecodes[this.state.current].content}
        </div>
        <button onClick={this.handleClick}>next</button>
      </div>
    )
  }
}

export default App