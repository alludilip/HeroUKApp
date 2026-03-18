import { test, expect } from '@playwright/test';

/*
In above test and expect functions are imported, to be used for our testing.
test: It is used to create individual test. It takes below parameters:
Title - name of the test
async: Because all actions take time and it needs to wait until action is completed. It waits for promise to be returned.
await: it waits until action is completed and prevents race conditions.
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


});