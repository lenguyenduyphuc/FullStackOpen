import React from 'react'


const Total = ({parts}) =>{
  console.log('Showing parts of total', parts)
  const total = parts.reduce((sum, part) =>{
    return sum + part.exercises
  }, 0)
  return (
    <p><b>Number of exercises {total}</b></p>
  )
}

export default Total