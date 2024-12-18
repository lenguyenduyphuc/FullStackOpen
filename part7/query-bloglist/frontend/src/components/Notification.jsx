import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  console.log(message)

  if (message.includes('Error')) {
    return (
      <div className="error" style={{
        color: 'red',
        background: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px'
      }}>
        {message}
      </div>
    )
  }

  return (
    <div className="confirm" style={{
      color: 'green',
      background: 'lightgrey',
      fontSize: '20px',
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }}>
      {message}
    </div>
  )
}

export default Notification