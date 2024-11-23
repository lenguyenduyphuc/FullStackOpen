const { test, expect, beforeEach, describe} = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
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
      await page.getByRole('button', { name: 'login'}).click()
      await page.getByTestId('username').fill('Tien')
      await page.getByTestId('password').fill('12345')

      await page.getByRole('button', { name: 'Log in' }).click()
      await expect(page.getByText('Lam Tien Dung log in')).toBeVisible()
    })
  })
})