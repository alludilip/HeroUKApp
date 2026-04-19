import { test, expect } from '@playwright/test'

test('Handling dropdown button', async ({ page }) => {

    const dropDownLink = page.getByRole('link', { name: 'Dropdown' });
    const dropDownMenu = page.locator("//select[@id='dropdown']");

    await dropDownLink.click();
    await dropDownMenu.selectOption({ value: '1' });
    await expect(dropDownMenu).toHaveValue('1');

    await dropDownMenu.selectOption({ label: 'Option 2' });
    await expect(dropDownMenu).toHaveValue('2');

    await dropDownMenu.selectOption({ index: 1 });
    await expect(dropDownMenu).toHaveValue('Option 1');

    await dropDownMenu.selectOption({ index: 2 });
    await expect(dropDownMenu).toContainText('Option 2');

});


test('Handle a dynamic dropdown', async ({ page }) => {
    // Navigate to a page with a dynamic dropdown (using a placeholder URL)
    // You should replace this with the actual URL of your target page.
    await page.goto('https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo');

    const countryName = 'India';

    // Click to open the dropdown/input field
    await page.locator('#country + span').click();

    // The options might be in a list that appears after clicking/typing.
    // Use a locator to find the results container and then filter for the specific option.
    // The specific locators ('ul#select2-country-results', 'li') will depend on the website's HTML structure.
    await page.locator("ul#select2-country-results").locator("li", { hasText: countryName }).click();

    // Optional: Verify the selection was successful
    // The verification method depends on how the page updates after selection.
    // For this specific example, you might need a custom assertion, but in general, you would check the input value.
    // await expect(page.locator('#country')).toHaveValue('value-associated-with-India');
});