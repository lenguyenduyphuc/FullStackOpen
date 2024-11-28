const { test, expect, beforeEach, describe} = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')


describe('Blog app', () => {
  beforeEach(async ({ page, request}) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Lam Tien Dung',
        username: 'Tien',
        password: '12345'
      }
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Le Nguyen Duy Phuc',
        username: 'Phuc',
        password: '123456'
      }
    })
  
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Blogs')
    const login = await page.getByText('Login Form')
    await expect(locator).toBeVisible()
    await page.getByRole('button', {name: 'login'}).click()
    await expect(login).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'Tien', '12345')
      await expect(page.getByText('Lam Tien Dung log in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({page}) => {
      await loginWith(page, 'Phuc', '123456')
      await expect(page.getByText('Login Form')).toBeVisible()
    })
  })
})

describe('When logged in', () => {
  beforeEach(async ({ page, request}) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Lam Tien Dung',
        username: 'Tien',
        password: '12345'
      }
    })

    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Le Nguyen Duy Phuc',
        username: 'Phuc',
        password: '123456'
      }
    })
  
    await page.goto('http://localhost:5173')
  })

  test('a new blog can be created', async ({ page }) => {
    await loginWith(page, 'Tien', '12345')-

    await createBlog(page, 'A test title', 'A test author', 'https://fullstackopen.com/en/part5/end_to_end_testing_playwright')

    await expect(page.getByText('a new blog A test title by A test author added')).toBeVisible()
    await expect(page.getByText('https://fullstackopen.com/en/part5/end_to_end_testing_playwright')).toBeVisible()
  })

  test('the blog can be liked', async ({ page })=> {
    await loginWith(page, 'Tien', '12345')
    await createBlog(page, 'A test title', 'A test author', 'https://fullstackopen.com/en/part5/end_to_end_testing_playwright')

    await page.getByRole('button', { name: 'like'}).click()
    await expect(page.getByText('1')).toBeVisible()
  })

  test('Ensures that the user who added the blog can delete the blog', async ({ page }) => {
    await loginWith(page, 'Tien', '12345')
    await createBlog(page, 'A test title', 'A test author', 'https://fullstackopen.com/en/part5/end_to_end_testing_playwright')

    page.on('dialog', async (dialog) => {
      await dialog.accept()
    })

    await page.getByRole('button', {name: 'Delete'}).click()
    await expect(page.getByText('A test title A test author')).not.toBeVisible()
  })

  test('Ensures that only the user who added the blog sees the blogs remove button', async ({ page }) => {
    await loginWith(page, 'Tien', '12345')
    await createBlog(page, 'A test title', 'A test author', 'https://fullstackopen.com/en/part5/end_to_end_testing_playwright')

    await expect(page.getByText('A test title A test author')).toBeVisible()

    await page.getByRole('button', { name : 'Log out'}).click()
    
    await loginWith(page, 'Phuc', '123456')

    await expect(page.getByRole('button', {name: 'Delete'})).not.toBeVisible()
    await expect(page.getByText('Unknown user')).toBeVisible()
  })
})