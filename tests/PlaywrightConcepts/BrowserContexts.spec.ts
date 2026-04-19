import { test, expect,} from '@playwright/test'

/*
   In Playwright, every browser tab is represented as a Page Object, and these pages all belong to a BrowserContext.

*/

// Handling multiple browsers/Tabs in same execution
test('Multiple browser contexts', async ({ page, browser, context }) => {

   // To add new tabs to the same window, use same context and create new page
   await page.goto("https://the-internet.herokuapp.com/drag_and_drop");

   const page2 = await context.newPage();
   await page2.goto("https://jqueryui.com/datepicker/");
   const tabs = context.pages;
   const pagescount = tabs.length;
   console.log(`page count is ${pagescount}`);

   // Creating an isolated browser window and opening a new url to that
   const context1 = await browser.newContext(
      {httpCredentials:{username:'user', password:'pass'}}
   );
   const page3 = await context1.newPage();
   await page3.goto("https://www.google.com")
   page3.reload(); // Refresh the page
   page3.goBack(); // Navigate back to the previous page
   page3.goForward(); // Navigate forward to the next page

});



/*
   To handle tabs that open during the test execution:
   To handle tabs that open during the test execution, we can use the waitForEvent method to listen for new page events. 
   This allows us to capture the new tab as soon as it opens and perform actions on it.
   Then we can use the browser context to manage multiple tabs and close any unwanted tabs based on their titles or other criteria.
*/


test('topDeals', async ({ context, page, browser }) => {

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');
    const topDealsLink = page.getByRole('link', { name: 'Top Deals' });
    await page.getByRole('link', { name: 'Top Deals' }).click();

    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Listen for new page
        page.click('a[target="_blank"]') // Trigger the click
    ]);
    await newPage.waitForLoadState(); // Wait for the new page to load

        // Close tabs with title QA Summit
    const pages = browser.contexts()[0].pages();
    for (const p of pages) {
        const title = await p.title();
        if (title.match(/QA Summit/i)) {
            await p.close();
        }
    }
    await expect(newPage).toHaveURL('https://rahulshettyacademy.com/seleniumPractise/#/offers');

    let searchItem = 'Wheat';
    await newPage.getByRole('searchbox', { name: 'Search:' }).fill(searchItem);

    const itemPrice = await newPage.locator(`//table[@class="table table-bordered"]//td[text()="${searchItem}"]/following-sibling::td[1]`).textContent();
    console.log(itemPrice);
    const discountPrice = await newPage.locator(`//table[@class="table table-bordered"]//td[text()="${searchItem}"]/following-sibling::td[2]`).textContent();
    console.log(discountPrice);

})