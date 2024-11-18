const BlogForm = ({
	handleCreateBlog,
	handleTitleChange,
	handleAuthorChange,
	handleUrlChange,
	newTitle,
	newAuthor,
	newUrl
}) => {
	return (
		<div>
			<form onSubmit={handleCreateBlog}>
				<div>
					title
					<input
						type='text'
						value={newTitle}
						name='Title: '
						placeholder='Title'
						onChange={handleTitleChange}
					/>
				</div>
				<div>
					author
					<input
						type='text'
						value={newAuthor}
						name='Author: '
						placeholder='Author'
						onChange={handleAuthorChange}
					/>
				</div>
				<div>
					url
						<input
						type='text'
						value={newUrl}
						name='URL: '
						placeholder='URL'
						onChange={handleUrlChange}
						/>
				</div>
				<button type='submit'>Create</button>
			</form>
		</div>
	)
}

export default BlogForm