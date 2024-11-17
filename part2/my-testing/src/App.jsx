import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Noti'
import Footer from './components/Footer'
import loginService  from './services/login'


const App = () => {
	const [notes, setNotes] = useState(null)
	const [newNote, setNewNote] = useState('')
	const [showAll, setShowAll] = useState(true)
	const [errorMessage, setErrorMessage] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [user, setUser] = useState(null)

	useEffect(() => {
		noteService
		.getAll()
		.then(initialNotes => {
			setNotes(initialNotes)
		})
	}, [])

	//do not render anythin if nots is still null
	if (!notes) {
		return null
	}

	const addNote = (event) => {
		event.preventDefault()
		const noteObject = {
			content: newNote,
			important: Math.random() > 0.5,
		}
	
		noteService
		.create(noteObject)
			.then(returnedNote => {
			setNotes(notes.concat(returnedNote))
			setNewNote('')
		})
	}

	const toggleImportanceOf = id => {
		const note = notes.find(n => n.id === id)
		const changedNote = { ...note, important: !note.important }
	
		noteService
		.update(id, changedNote)
			.then(returnedNote => {
			setNotes(notes.map(note => note.id !== id ? note : returnedNote))
		})
		.catch(()=> {
			setErrorMessage(
			`Note '${note.content}' was already removed from server`
			)
			setTimeout(() => {
			setErrorMessage(null)
			}, 5000)
		})
	}

	const handleNoteChange = (event) => {
		setNewNote(event.target.value)
	}

	const notesToShow = showAll
		? notes
		: notes.filter(note => note.important)

	const handleLogin = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username, password,
			})
			setUser(user)
			setUsername('')
			setPassword('')
		} catch {
			setErrorMessage('Wrong credentials')
			setTimeout(() => {
				setErrorMessage(null)
			}, 5000)
		}
	}
	
	const loginForm = () => (
		<form onSubmit = {handleLogin}>
			<div>
				username
				<input
					type = 'text'
					value =  {username}
					name = 'Username'
					onChange = {({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input 
					type = 'text'
					value = {password}
					name = 'Password'
					onChange = {({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type = 'submit'>Login</button>
		</form>
	)

	const noteForm = () => (
		<form onSubmit = {addNote}>
			<input 
				value = {newNote}
				onChange = {handleNoteChange}
			/>
			<button type = 'submit'>Save</button>
		</form>
	)

	return (
		<div>
		<h1>Notes</h1>

		<Notification message={errorMessage} />

		{user === null ?
			loginForm() :
			<div>
				<p>{user.name} logged - in</p>
				{noteForm()}
			</div>	
		}

		<div>
			<button onClick={() => setShowAll(!showAll)}>
			show {showAll ? 'important' : 'all' }
			</button>
		</div>      
		<ul>
			{notesToShow.map(note => 
			<Note
				key={note.id}
				note={note}
				toggleImportance={() => toggleImportanceOf(note.id)}
			/>
			)}
		</ul>
		<form onSubmit={addNote}>
		<input
			value={newNote}
			onChange={handleNoteChange}
			/>
			<button type="submit">save</button>
		</form> 
		<Footer/>
		</div>
	)
}

export default App