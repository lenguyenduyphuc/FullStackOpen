const NoteForm =  ({ onSubmit, handleChange, value }) => {
    return (
        <div>
            <h2>Create a new note</h2>
            <form onSubmit = {onSubmit}>
                <input 
                    value = {value}
                    onChange = {handleChange}
                />
            </form>
            <button type = 'submit'>Save</button>
        </div>
    )
}

export default NoteForm