import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
    const blog = {
        title: 'how to live a good life',
        author: 'Superman',
        url:"https://reactpatterns.com/",
        likes:7
    }

    let mockUpdateBlog = vi.fn()
    let mockRemoveBlog = vi.fn()
    let mockUser = vi.fn()

    const { container } = render(<Blog blog={blog} updatedBlog={mockUpdateBlog} removedBlog={mockRemoveBlog} user={mockUser}/>)
    screen.debug()

    expect(container).toHaveTextContent('how to live a good life')
})

