import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
	const [newTitle, setNewTitle] = useState('')
	const [newAuthor, setNewAuthor] = useState('')
	const [newUrl, setNewUrl] = useState('')

	const addBlog = (event) => {
		event.preventDefault()
		createBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl
		})

		setNewTitle('')
		setNewAuthor('')
		setNewUrl('')
	}


	return (
		<div>
			<h2>Create new blog</h2>
			<form onSubmit={addBlog}>
				<div>
					title
					<input
						data-testid = 'title'
						id ='title'
						type='text'
						value={newTitle}
						name='Title: '
						placeholder='Title'
						onChange={event => setNewTitle(event.target.value)}
					/>
				</div>
				<div>
					author
					<input
						data-testid = 'author'
						id='author'
						type='text'
						value={newAuthor}
						name='Author: '
						placeholder='Author'
						onChange={event => setNewAuthor(event.target.value)}
					/>
				</div>
				<div>
					url
						<input
							data-testid = 'url'
							id='url'
							type='url'
							value={newUrl}
							name='URL: '
							placeholder='URL'
							onChange={event => setNewUrl(event.target.value)}
						/>
				</div>
				<button type='submit'>Create</button>
			</form>
		</div>
	)
}

export default BlogForm