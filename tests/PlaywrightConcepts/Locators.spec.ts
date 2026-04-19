import { test, expect } from '@playwright/test';

/*
In above test and expect functions are imported, to be used for our testing.
test: It is used to create individual test. It takes below parameters:
Title - name of the test
async: Because all actions take time and it needs to wait until action is completed. It waits for promise to be returned.
await: it waits until action is completed and prevents race conditions.

Actionability check - Playwright performs actionability checks before performing any action on an element. It ensures that the element is
 visible, enabled, stable, and not obscured by other elements.

 We can use explicit wait beyond above checks:

- waitForFunction: Waits for a custom JavaScript function to return true.

await page.waitForTimeout() // Sleep for a specified amount of time (not recommended for regular use, as it can lead to flaky tests).
await page.waitForSelector('#submit-button'); // Waits for the element with the specified selector to be present in the DOM and visible.
await page.waitForLoadState('networkidle'); // Waits until there are no network connections for at least 500 ms.
await page.waitForURL('https://example.com/dashboard'); // Waits until the URL matches the specified value.
await page.waitForFunction(() => document.querySelector('#status').innerText === 'Ready'); // Waits until the specified function returns true.  
await page.waitForNavigation() // Waits for the page to navigate to a new URL. This is often used after actions that trigger navigation, such as clicking a link or submitting a form.
*/

test('homepage has title', async ({ page }) => {
  await page.goto('https://selectorshub.com/xpath-practice-page/');
  
  
  const email = page.getByRole('textbox', { name: 'Email', disabled:false, exact:true })
  const brokenLink = page.getByRole('link', { name: 'This is a broken link' });
  
  // More used techniques
  const paidCourseLink = page.getByRole('link', { name: 'Get Free Access of Advanced' }); // To get by role like button, checkbox, link etc.
  const getLocatorbyAltText = page.getByAltText("Text in altextparameter", {exact:true}); // Useful for images or area tag. alt attribute should be present
  const getLocatorByLabel = page.getByLabel('userName'); // Used for label elements
  const getLocatorByText = page.getByText(''); // To get locator by alttext, useful for non interactive elements like span, div or img
  const locator = page.locator("xpath/css") // send xpath or css selector

  // Least used techniques
  
  const getLocatorPlaceHolder = page.getByPlaceholder('placeHoldername') // Get elements from placeholder attribute
  const getByTitle = page.getByTitle('title') // gets elements using title attribute
  const getByTestID = page.getByTestId("test") // should have test-id attribute, The attreibute needs to be added to config.ts

  // Wait mechanisms
  const locator1 = page.getByLabel('userName').waitFor({state:'attached'}); // Waits for element to be attached to DOM
  const locator2 = page.getByLabel('userName').waitFor({state:'detached'}); // Waits for element to be detatched from DOM
  const locator3 = page.getByLabel('userName').waitFor({state:'hidden'}); // Waits for element to be hidden
  const locator4 = page.getByLabel('userName').waitFor({state:'visible'}); // Waits for element to be visible
  page.waitForURL("https://selectorshub.com/xpath-practice-page/"); //Waits for url to load 



});