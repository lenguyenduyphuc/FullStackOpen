import Course from './components/Course'

const App = () => {
    const course = [{
      name: 'Half Stack Application Development',
      id: 1,
      contents: [
        {
          id: 1,  
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
            id: 2,
          name: 'Using props to pass data',
          exercises: 7
        },
        {
            id: 3,
          name: 'State of a component',
          exercises: 14 
        },
        {
            id: 4,
            name: 'Redux',
            exercises: 11
        }
      ]
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          id: 2,
          exercises: 3
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2
        }
      ]
    }
  ] 
  
    return (
      <div>
        <Course course={course} />
      </div>
    );
  }
  
  export default App