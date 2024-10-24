import React from 'react'

const Filter = ({newFilter, handleFilterChange}) => {
    return (
        <div>
            filter <input 
                type='text'
                value={newFilter}
                onChange={handleFilterChange}
            />
        </div>
    )
}

export default Filter