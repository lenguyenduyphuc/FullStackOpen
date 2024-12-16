import { useDispatch } from "react-redux"
import {createBlog} from "../reducers/blogReducer"
import { useField } from "../hooks/hooks"

const BlogForm = () => {
	const dispatch = useDispatch()

	const newTitle = useField('text')
	const newAuthor = useField('text')
	const newUrl = useField('text')

	const addBlog = async (event) => {
		event.preventDefault()

		const blogObject = {
			title: newTitle.value,
      author: newAuthor.value,
      url: newUrl.value
		}
		dispatch(createBlog(blogObject))
	}


	return (
		<div>
			<h2>Create new blog</h2>
			<form onSubmit={addBlog} >
				<div>
					title
					<input
						data-testid = 'title'
						id='title'
						name='Title: '
						placeholder='Title'
						{...newTitle}
					/>
				</div>
				<div>
					author
					<input
						data-testid = 'author'
						id='author'
						name='Author: '
						placeholder='Author'
						{...newAuthor}
					/>
				</div>
				<div>
					url
						<input
							data-testid = 'url'
							id='url'
							name='URL: '
							placeholder='URL'
							{...newUrl}
						/>
				</div>
				<button type='submit'>Create</button>
			</form>
		</div>
	)
}

export default BlogForm