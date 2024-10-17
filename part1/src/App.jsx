// "use strict"
// // Header Component
// const Header = ({ courseName }) => {
//   console.log(courseName)
//   return <h1>{courseName}</h1>;
// };

// // Part Component
// const Part = ({ part }) => {
//   return (
//     <p>
//       {part.name} {part.exercises}
//     </p>
//   );
// };

// // Content Component
// const Content = ({ contents }) => {
//   console.log(contents)
//   return (
//     <div>
//       <Part part={contents[0]} />
//       <Part part={contents[1]} />
//       <Part part={contents[2]} />
//     </div>
//   );
// };

// // Total Component
// const Total = ({ contents }) => {
//   const totalExercises = contents[0].exercises + contents[1].exercises + contents[2].exercises;
//   return <p>Number of exercises {totalExercises}</p>;
// };

// // App Component
// const App = () => {
//   const course = {
//     name: 'Half Stack Application Development',
//     contents: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 15
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14 
//       }
//     ]
//   };

//   return (
//     <div>
//       <Header courseName={course.name} />
//       <Content contents={course.contents} />
//       <Total contents={course.contents} />
//     </div>
//   );
// }
import {useState} from 'react'

const Display = ({counter}) => counter


const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}


const Button = (props) => {
  <button onClick={props.handleClick}>
    {props.text}
  </button>
}
const App = () => {
  const [value, setValue] = useState(10)


  const setToValue = (newValue) => () => {
    console.log('value now', newValue)
    setValue(newValue)
  }
  
  return (
    <div>
      {value}
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
export default App;
