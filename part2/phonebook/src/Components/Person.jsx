import React from 'react'

const Person = ({personsToShow}) => {
    console.log(personsToShow)
    return (
        <>
        {personsToShow.map((person) => {
            return (
                <p key={person.id}>
                {person.name} {person.number}
            </p>
            )
        })}
        </>
    )
}

export default Person