
/*
 Test Timeout: Max timeout for a single test to run. 30000 ms by default
 Expect Timeout: Max timeout for an assertion. defaults to 5000 ms
 Action Timeout: No default timeout. Refers to test timeout. Can be specified within the action explicitly.
 Navigation Timeout: No default timeout. Refers to test timeout. Can be specified within the action explicitly.
 Global Timeout: Max time for all tests to run. No default timeout. Can be used to prevent CI/CD runs from running indefinitely.

 Best Practices:
 1. Avoid using page.waitForTimeout(ms). i.e sleep time
 2. Rely on auto waiting
 3. Use web first assertions like expect(locator).toBeVisible() , toBeEnabled()
 4. Instead of increasing global timeouts, use specific timeouts for actions or assertions

 
 export default defineConfig({
  timeout: 60000, // 60 seconds for each test
  globalTimeout: 3600000, // 1 hour for the entire run
  use: {
    actionTimeout: 10000, // 10 seconds for all actions
    navigationTimeout: 30000, // 30 seconds for all navigations
    // ... other options
  },
  expect: {
    timeout: 10000, // 10 seconds for all assertions
  },
});

*/

import {test, expect} from '@playwright/test'

test('DragAndDrop-Iframe', async({page})=>{
    
    test.setTimeout(45000); // Updates test timeout for only this test.

    await page.goto("https://jqueryui.com/droppable/", {timeout:45000});

    // identifying the frame where elements are available
    const iframeElement = page.frameLocator("//iframe[@class='demo-frame']");

    // Identifying elements inside the iframe
    const dragElement = iframeElement.locator("//div[@id='draggable']");
    const dropElement = iframeElement.locator("//div[@id='droppable']");

    page.waitForTimeout(5000) // Sleeps for 5 seconds. Do not use it to avoid slow and flaky test execution
    
    // Performing drag and drop elements
    await dragElement.dragTo(dropElement, {timeout:10000}); // Updates timeout for this action
    await expect(dropElement).toContainText("Dropped!", {timeout:10000}); // Updates assertion timeout for this assertion

});