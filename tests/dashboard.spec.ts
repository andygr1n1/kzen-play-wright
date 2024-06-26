import { test, expect } from '@playwright/test'

test('Authorized and redirected to dashboard', async ({ page }) => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYxOTJiNzhlLTM5OWUtNGZjNS05Njc2LWNlMGJmNjViMjIwYiIsInJvbGUiOiJoZXJvIiwiYWxsb3dlZC1yb2xlcyI6WyJhZG1pbiIsImd1ZXN0IiwiaGVybyIsInN1cGVyX2hlcm8iXSwiaWF0IjoxNzE5NDI1NzAyLCJleHAiOjE3MTk0MjY5MDJ9.lXUi1zVz-Y-AkNIwUvfrgyagRaMNUT1o3NaBJBcmZOs'
    const sessionId = 'd4379a4e-25a2-4043-bc7f-46f5c558d059'

    await page.context().addCookies([
        {
            name: 'accessToken',
            value: token,
            domain: 'www.kzen.cloud', // Use the correct domain
            path: '/',
            httpOnly: false,
            secure: false,
        },
        {
            name: 'sessionId',
            value: sessionId,
            domain: 'cryptic-thicket-06366.herokuapp.com', // Use the correct domain
            path: '/',
            httpOnly: true,
            secure: true,
            sameSite:'None'
        },
    ])

    // Reload the page to apply cookies
    await page.reload()

    // Wait for some time to ensure cookies are applied (optional, for debugging)
    await page.waitForTimeout(5000)
    await page.reload()
    await page.goto('https://kzen.cloud/dashboard')

    // Check if the "Dashboard" button is visible
    await expect(page.locator('div:has-text("Dashboard")')).toBeVisible()
})
