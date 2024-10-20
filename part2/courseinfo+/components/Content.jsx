import Part from './Part';

const Content = ({ parts }) => {
  if (!parts || !Array.isArray(parts)) {
    return <p>No parts available</p>;
  }

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
}

export default Content;
