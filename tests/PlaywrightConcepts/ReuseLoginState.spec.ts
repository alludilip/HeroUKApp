import { test, expect } from '@playwright/test'

/*
    We can use storageState in playwright to keep the login state for all tests, to reduce the login time for each test and remove flakiness
    1. Create auth-setup.ts file and add the steps to login the application. Export the function which implements the login steps.
    2. Add <globalSetup:'tests/PlaywrightConcepts/auth-setup.ts',> in config.ts to run this before test is run.
    3. storageState:'tests/PlaywrightConcepts/loginAuthState.json', add this in use {} section
    4. The above will generate <Authstate.json> file which will be used for further tests 
    5. Add the .json file to gitignore to avoid uploading sensitive data in git.
    6. if the json file is available, auth-setup.ts will not run again. It will reuse the same file for new runs.
    7. We can also login using API request and use the same to create storagestate. 
*/

test('Auto Auth Test1', async ({ page }) => {
    await page.goto("https://www.debugbear.com/");
    await expect(page.getByRole('heading', { name: 'Start Monitoring Your Website' })).toBeVisible({timeout:15000});

})

test('Auto Auth Test2', async ({ page }) => {
    await page.goto("https://www.debugbear.com/");
    await expect(page.getByRole('heading', { name: 'Start Monitoring Your Website' })).toBeVisible({timeout:15000});
})


test('Auto Auth Test3', async ({ page }) => {
    await page.goto("https://www.debugbear.com/");
    await expect(page.getByRole('heading', { name: 'Start Monitoring Your Website' })).toBeVisible({timeout:15000});
})