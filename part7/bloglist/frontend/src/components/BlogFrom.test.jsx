import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { expect } from 'chai'

describe('Test blog form functionality', () => {
    test('<BlogForm /> updates parent state and calls onSubmit', async () => {
        let mockCreate = vi.fn()
        const user = userEvent.setup()

        render(<BlogForm createBlog={mockCreate} />);

        const input1 = screen.getByPlaceholderText('Title')
        const input2 = screen.getByPlaceholderText('Author')
        const input3 = screen.getByPlaceholderText('URL')

        const button = screen.getByText('Create')
        
        await user.type(input1, 'testing a blog form...')
        await user.type(input2, 'Dung')
        await user.type(input3, 'https://claude.ai/chat/e9f4bf30-ce16-44da-a368-acbcc873f462')
        await user.click(button)

        screen.debug()

        expect(mockCreate.mock.calls).toHaveLength(1)
        console.log(mockCreate.mock.calls[0][0])
        //expect(mockCreate.mock.calls[0][0].title).toBe('testing a blog form...')
        expect(mockCreate.mock.calls[0][0]).toEqual({
            title: 'testing a blog form...',
            author: 'Dung',
            url: 'https://claude.ai/chat/e9f4bf30-ce16-44da-a368-acbcc873f462',
        })
    })
})