import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
  console.log('Showing content', parts)
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

export default Content