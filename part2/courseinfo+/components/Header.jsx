import React from 'react'
const Header = ({course}) => {
    console.log('Header',course)
    return (
        <h1>{course}</h1>
    )
}

export default Header