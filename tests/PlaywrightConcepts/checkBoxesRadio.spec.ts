import { expect, test } from "@playwright/test";

test('Checkboxes', async ({ page }) => {

    // Navigate to the page and wait for it to load
    await page.goto('https://the-internet.herokuapp.com/');
    await page.waitForURL('https://the-internet.herokuapp.com/');


    // create locator for Checkboxes hyperlink
    const checkboxesLink = page.locator("//a[@href='/checkboxes']");
    //const checkbox1 = page.locator('#checkboxes input[type="checkbox"]').nth(0);
    const checkbox1 = page.locator("xpath=//input[@type='checkbox']").nth(0);
    const checkbox2 = page.locator("xpath=//input[@type='checkbox']").nth(1);

    // Click on the "Checkboxes" link and wait for the page to load
    await checkboxesLink.click();
    // Check the first checkbox and verify that it is checked
    await checkbox1.check();
    await expect(checkbox1).toBeChecked();
    // Uncheck the second checkbox and verify that it is unchecked
    await checkbox2.uncheck();
    await expect(checkbox2).not.toBeChecked();
    // Screenshot of whole page after checking and unchecking checkboxes
    await page.screenshot({ path: './tests/WebAppTests/Screenshots/checkboxes-page.png', fullPage: true });

});

test('handle radio buttons', async ({ page }) => {
    await page.goto('YOUR_PAGE_URL');

    // 1. Locate and check a specific radio button
    const xlRadioButton = page.getByLabel('XL');
    await xlRadioButton.check();

    // 2. Verify that the radio button is checked
    await expect(xlRadioButton).toBeChecked();

    // 3. Verify that another radio button in the same group is unchecked
    const sRadioButton = page.getByLabel('S');
    await expect(sRadioButton).not.toBeChecked();
});