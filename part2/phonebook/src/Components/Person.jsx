import React from 'react';

const Person = ({ personsToShow }) => {
  console.log(personsToShow);  // This will only log if the props change
  return (
    <>
      {personsToShow.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        );
      })}
    </>
  );
};

export default Person;
