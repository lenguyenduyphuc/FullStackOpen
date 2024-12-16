import { useState } from 'react'
import { useField } from '../hooks/hooks'

const LoginForm = ({ createLogin }) => {
	const newUsername = useField('text')
	const newPassword = useField('password')
	
	const handleLogin = (event) => {
		event.preventDefault()
		createLogin({
			username: newUsername.value,
			password: newPassword.value
		})
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
							name='Username'
							placeholder='Username: '
							{...newUsername}
						/>
				</div>
				<div>
					password
						<input
						data-testid='password'
							type='password'
							value={newPassword}
							name='Password: '
							placeholder='Password: '
							{...newPassword}
						/>
				</div>
				<button type='submit'>Log in</button>
			</form>
		</div>
	)
}

export default LoginForm