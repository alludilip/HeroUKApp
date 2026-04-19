import { test, expect } from '@playwright/test';

test('Mouse Actions', async ({ page }) => {

    const dropDownLink = page.getByRole('link', { name: 'Drag and Drop' });
    const dragElement = page.locator("//div[@id='column-a']");
    const dropElement = page.locator("//div[@id='column-b']");

    // Left click
    await dropDownLink.click();

    // Right Click
    await dragElement.click({ button: 'right' });

    // Middle button Click
    await dragElement.click({ button: 'middle' });

    // Hover over an element
    await dropDownLink.hover();

    // Click with modifiers
    await dragElement.click({ modifiers: ['Control'] });

    // Scrolling
    await dragElement.scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 500); // Scroll down by 500 pixels
    await page.mouse.wheel(0, -500); // Scroll down by 500 pixels
    await page.mouse.wheel(500, 0); // Scroll right by 500 pixels
    await page.mouse.wheel(-500, 0); // Scroll left by 500 pixels

    // Key Actions
    await page.keyboard.press('PageUp');
    await page.keyboard.press('Shift+A');

    
    //Drag and Drop Action
    await dragElement.dragTo(dropElement);

    // Drag and Drop manually
    await page.locator('#item-to-be-dragged').hover();
    await page.mouse.down();
    await page.locator('#item-to-drop-at').hover();
    await page.mouse.up();



});