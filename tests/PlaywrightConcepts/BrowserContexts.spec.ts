import {test, expect} from '@playwright/test'

/*
   In Playwright, every browser tab is represented as a Page Object, and these pages all belong to a BrowserContext.

*/

   // Handling multiple browsers/Tabs in same execution
    test('Multiple browser contexts', async({page,browser,context})=>{

        await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
        
        // Creating a new separate browser window and opening a new url to that
        context = await browser.newContext();
        const page2 = await context.newPage();
        await page2.goto("https://jqueryui.com/datepicker/");

        // Adding new tabs to the browser
        const newTab = await context.newPage();
        await newTab.goto("https://the-internet.herokuapp.com/drag_and_drop");

        const tabs = context.pages;
        const pagescount = tabs.length;

        console.log(`page count is ${pagescount}`);

    });