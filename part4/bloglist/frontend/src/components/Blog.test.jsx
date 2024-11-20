import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'chai'


describe('Blog components test', () => {
    const blog = {
        title: 'how to live a good life',
        author: 'Superman',
        url:"https://reactpatterns.com/",
        likes:7
    }

    let mockUpdateBlog = vi.fn()
    let mockRemoveBlog = vi.fn()

    test('renders content', () => {
        const { container } = render(<Blog blog={blog} updatedBlog={mockUpdateBlog} removedBlog={mockRemoveBlog}/>)
        screen.debug()
    
        expect(container).toHaveTextContent('how to live a good life')
    })
    
    test('renders URL and likes', async () => {
        const { container } = render(<Blog blog={blog} updatedBlog={mockUpdateBlog} removedBlog={mockRemoveBlog}/>)

        const user = userEvent.setup()
        const button = screen.getByText('View')
        await user.click(button)

        expect(container).toHaveTextContent("https://reactpatterns.com/")
        expect(container).toHaveTextContent("7")
        
    })
})