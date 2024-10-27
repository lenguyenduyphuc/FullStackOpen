import './App.css'


//Header of course info
const Header = (props) => (
  <h1>{props.name}</h1>
)

//Get the name and exercises inside the parts
const Part = (props) => (
  <>
    <h2>{props.part.name}</h2>
    <p>There are {props.part.exercises} exercises in this part of the course</p>
  </>
)

//Get the content
const Content = (props) => (
  <>
    <Part part = {props.parts[0]}/>
    <Part part = {props.parts[1]}/>
    <Part part = {props.parts[2]} />
  </>
)
//Calculate number of course
const Total = (props) =>{
  console.log(props)
  let total = props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises
  return (
    <p>Number of exercises {total}</p>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header header={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App;