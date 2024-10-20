const Total = ({ parts }) => {
    if (!parts || !Array.isArray(parts)) {
      return <p>Total exercises not available</p>;
    }
  
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
      <p><strong>total of {totalExercises} exercises</strong></p>
    );
  }
  
  export default Total;
  