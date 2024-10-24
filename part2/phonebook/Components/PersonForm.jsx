import React from 'react'

const PersonForm = ({addName, newName, handleNameChange, newNum,handleNewNum}) => {
    return (
        <>
        <form onSubmit={addName}>
        <div>
            name: <input 
            type="text"
            value={newName} 
            onChange={handleNameChange}/>
        </div>
        <div>
            number: <input
             type='text'
             value={newNum} 
             onChange={handleNewNum}/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
        </form>
        </>
    )
}

export default PersonForm