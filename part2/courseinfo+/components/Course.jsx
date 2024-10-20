import Header from './Header';
import Content from './Content';
import Total from './Total'

const Course = ({ course }) => {
    console.log(course)
  return (
    <div>
      <Header name={course.name} />
      <Content contents={course.contents} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
