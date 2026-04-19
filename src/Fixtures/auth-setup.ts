import { Browser, chromium, expect, Page } from "@playwright/test";

async function globalAuthSetup() {
    const browser: Browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto("https://www.debugbear.com/");
    await page.getByRole('link', { name: 'Log In' }).click();
    await page.locator('input[name="email"]').fill("dilip.kumar887@gmail.com");
    await page.locator('input[name="password"]').fill("TestingLogin@1234");
    await page.getByRole('button', { name: 'Log In' }).click();
    //await expect(page.getByRole('heading', { name: 'Start Monitoring Your Website' })).toBeVisible();

    // Save the state of the web page
    await page.context().storageState({ path: 'tests/PlaywrightConcepts/loginAuthState.json' })
    await browser.close();

}

export default globalAuthSetup;