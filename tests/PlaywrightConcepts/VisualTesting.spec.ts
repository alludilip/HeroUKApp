import { test, expect } from '@playwright/test';

/*
  Playwright Test includes the ability to produce and visually compare screenshots using await expect(page).toHaveScreenshot()
  First execution fails, Playwright test will generate reference screenshots. Subsequent runs will compare against the reference.
*/

test('example test', async ({ page }) => {
  await page.goto('https://playwright.dev');
  await expect(page).toHaveScreenshot();
  await expect(page).toHaveScreenshot('Landing.png');
});

