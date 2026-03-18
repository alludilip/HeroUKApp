import { test, expect } from '@playwright/test';

/*
Hooks: These are used to run repeated tasks and setup/teardown logics
beforeAll: Runs once before all tests executed in current file or tests in test.describe() group
beforeEach: Runs before each test in currnet file or before each test in test.describe() group
afterEach: Runs after each test in currnet file or after each test in test.describe() group
AfterAll: Runs once after all tests executed in current file or tests in test.describe() group 
*/

// Runs once before any test in the file starts (per worker)
test.beforeAll(async () => {
    console.log('Global setup: Create a user account in the database.');
});

// Runs before each test
test.beforeEach(async ({ page }) => {
    await page.goto('https://my.start.url');
    // Add login steps here (filling in username/password and clicking sign-in)
    await page.getByLabel('Username').fill('testuser');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign in' }).click();
    console.log('Navigated to login and signed in before each test.');
});

test('Test case 1: Verify dashboard access', async ({ page }) => {
    // Since beforeEach handles login, the test can focus on the specific scenario
    await expect(page.locator('.dashboard-title')).toContainText('Welcome, testuser');
    console.log('Running test 1.');
});

test('Test case 2: Verify profile page access', async ({ page }) => {
    // This test also starts with the user logged in
    await page.getByRole('link', { name: 'Profile' }).click();
    await expect(page).toHaveURL(/.*profile/);
    console.log('Running test 2.');
});

// Runs after each test
test.afterEach(async ({ page }) => {
    // Cleanup steps after each test, e.g., capturing a screenshot
    await page.screenshot({ path: 'screenshot.png' });
    console.log('Screenshot captured after each test.');
});

// Runs once after all tests in the file have finished (per worker)
test.afterAll(async () => {
    console.log('Global teardown: Delete the user account from the database.');
});
