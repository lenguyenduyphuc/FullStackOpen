"use strict"
// Header Component
const Header = ({ courseName }) => {
  console.log(courseName)
  return <h1>{courseName}</h1>;
};

// Part Component
const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

// Content Component
const Content = ({ contents }) => {
  console.log(contents)
  return (
    <div>
      <Part part={contents[0]} />
      <Part part={contents[1]} />
      <Part part={contents[2]} />
    </div>
  );
};

// Total Component
const Total = ({ contents }) => {
  const totalExercises = contents[0].exercises + contents[1].exercises + contents[2].exercises;
  return <p>Number of exercises {totalExercises}</p>;
};

// App Component
const App = () => {
  const course = {
    name: 'Half Stack Application Development',
    contents: [
      {
        name: 'Fundamentals of React',
        exercises: 15
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
  };

  return (
    <div>
      <Header courseName={course.name} />
      <Content contents={course.contents} />
      <Total contents={course.contents} />
    </div>
  );
}

export default App