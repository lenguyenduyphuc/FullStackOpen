import { useState } from 'react'

const LoginForm = ({ createLogin }) => {
	const [newUsername, setNewUsername] = useState('')
	const [newPassword, setNewPassword] = useState('')
	
	const handleLogin = (event) => {
		event.preventDefault()
		createLogin({
			username: newUsername,
			password: newPassword
		})

		setNewUsername('')
		setNewPassword('')
	}

	return (
		<div>
			<h2>Login Form</h2>
			<form onSubmit = {handleLogin}>
				<div>
					username
						<input
							data-testid='username'
							type='text'
							value={newUsername}
							name='Username'
							placeholder='Username: '
							onChange={(event) => setNewUsername(event.target.value)}
						/>
				</div>
				<div>
					password
						<input
						data-testid='password'
							type='password'
							value={newPassword}
							name='Password: '
							onChange={(event) => setNewPassword(event.target.value)}
						/>
				</div>
				<button type='submit'>Log in</button>
			</form>
		</div>
	)
}

export default LoginForm