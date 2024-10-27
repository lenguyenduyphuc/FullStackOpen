import React from 'react'

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    
    return (
        <div style={footerStyle}>
            <br/>
            <em> Note app, my first React website</em>
        </div>
    )
}

export default Footer