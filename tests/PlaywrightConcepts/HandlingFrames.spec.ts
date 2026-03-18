import {test, expect} from '@playwright/test'

/* To handle iframe use framelocator to get the locator of iframe. Now use the iframe element to get the elements within the frame. 
   Unlike selenium we dont need to switch to frame and forth to interact with iframe elements.
   Playwright auto waits for elements to load before interacting with elements within it.
   If more than one frame is found with same locator, it throws error.
*/

test('DragAndDrop-Iframe', async({page})=>{

    await page.goto("https://jqueryui.com/droppable/");

    // identifying the frame where elements are available
    const iframeElement = page.frameLocator("//iframe[@class='demo-frame']");

    // Identifying elements inside the iframe
    const dragElement = iframeElement.locator("//div[@id='draggable']");
    const dropElement = iframeElement.locator("//div[@id='droppable']");
    
    // Performing drag and drop elements
    await dragElement.dragTo(dropElement);
    await expect(dropElement).toContainText("Dropped!");

});


