const LoginForm = ({
	handleSubmit,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password
}) => {
	return (
		<div>
			<h2>Login Form</h2>
			<form onSubmit = {handleSubmit}>
				<div>
					username
						<input
							type='text'
							value={username}
							name='Username'
							placeholder='Username: '
							onChange={handleUsernameChange}
						/>
				</div>
				<div>
					password
						<input
							type='password'
							value={password}
							name='Password: '
							onChange={handlePasswordChange}
						/>
				</div>
				<button type='submit'>Log in</button>
			</form>
		</div>
	)
}

export default LoginForm