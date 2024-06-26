import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
    await page.goto('https://kzen.cloud/')
    await expect(page).toHaveTitle(/KZen/)
})

test('login with email and password', async ({ page }) => {
    await page.goto('https://kzen.cloud/')

    await expect(page.getByPlaceholder('Email', { exact: true })).toBeVisible()
    // Input email and password from environment variables
    const email = process.env.EMAIL
    const password = process.env.PASSWORD

    try {
        if (!email || !password) throw 'Setup env email and password'
        await page.fill('input[name="email"]', email)
        await page.fill('input[type="password"]', password)
    } catch (e) {
        console.log('login with email and password:', e)
    }

    await page.click('button[type="submit"]')

    await expect(page).toHaveURL(/dashboard/)

    await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible()

    await page.reload()

    await expect(page.getByRole('button', { name: 'Dashboard' })).toBeVisible()
})
