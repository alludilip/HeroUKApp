import {test, expect} from '@playwright/test'

/* 
   Refer to link https://playwright.dev/docs/test-assertions for all assertions
*/

test('Assertions', async({page})=>{

    await page.goto("https://jqueryui.com/droppable/");

    // identifying the frame where elements are available
    const iframeElement = page.frameLocator("//iframe[@class='demo-frame']");

    // Identifying elements inside the iframe
    const dragElement = iframeElement.locator("//div[@id='draggable']");
    const dropElement = iframeElement.locator("//div[@id='droppable']");
    
    // Performing drag and drop elements
    await dragElement.dragTo(dropElement);
    await expect(dropElement).toContainText("Dropped!");
    await expect(dropElement).not.toHaveText(/test/) // Negating checks
    await expect(dropElement).not.toBeVisible();

    // Soft Assertions
    await expect.soft(dragElement).toBeEnabled();

    // Custom message
    await expect(dragElement,"Text should be present inside it").toHaveText('Testing');

    



});


