import { test, expect } from '@playwright/test'

/*
   page.screenshot() method is used to capture screenshot.
   Entire Page -
   An Element -
   Clipped Area -
*/

test('ScreenshotOfPage', async ({ page }, testInfo) => {

    await page.goto('https://selectorshub.com/xpath-practice-page/');
    const email = page.getByRole('textbox', { name: 'Email', disabled: false, exact: true })

    await page.screenshot({ path: './tests/PlaywrightConcepts/Screenshots/fullpage.jpeg', quality:70}); // Take page which is visible in screen. Quality is only for jpeg
    await page.screenshot({ path: './tests/PlaywrightConcepts/Screenshots/fullpage.jpeg', fullPage: true }); // To take screenshot of page which is not visible and has to be scrolled
    await email.screenshot({ path: './tests/PlaywrightConcepts/Screenshots/EmailTextField.png' })
    await page.screenshot({
        path: './tests/PlaywrightConcepts/Screenshots/clipped.png',
        clip: { x: 0, y: 0, width: 500, height: 250 }
    });
    
    // Attaching screenshot to 
     // 2. Take a screenshot and get the buffer.
  const screenshotBuffer = await page.screenshot({fullPage:true});

  // 3. Add the screenshot to the report using testInfo.attach().
  await testInfo.attach('Playwright Dev Page Screenshot', {
    body: screenshotBuffer,
    contentType: 'image/png',
  })

})

/*
  To automatically take screenshots on failure set the below option in config.ts
  export default defineConfig({
  use: {
    screenshot: 'only-on-failure', // other options: 'off', 'on', 'on-first-failure'
    // ... other options
  },

*/