import React from 'react'

const Part = ({part, exercises}) =>{
  console.log('Part component showing',part, exercises)
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

export default Part