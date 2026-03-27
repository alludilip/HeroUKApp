import {expect, test} from "@playwright/test"

/*
    Playwright Trace Viewer is a GUI tool that helps you explore recorded Playwright traces after the script has run. 
    Traces are a great way for debugging your tests when they fail on CI.

    Opening traces:
    1. Viewing from the playwright-report. npx playwright show-report ./playwright-report
    2. using npx playwright show-trace path/to/trace.zip
    3. Opening the trace.zip file in https://trace.playwright.dev/ website 

*/

    test('Handling dropdown button',async({page, context})=>{

    // // To activate trace viewing for only one test.
    // await context.tracing.start({snapshots:true, screenshots:true});

    await page.goto('https://admin:admin@the-internet.herokuapp.com/');
    const dropDownLink = page.getByRole('link', {name:'Dropdown'});
    const dropDownMenu = page.locator("//select[@id='dropdown']");

    await dropDownLink.click();
    await dropDownMenu.selectOption({value:'1'});
    await expect(dropDownMenu).toHaveValue('1');

    await dropDownMenu.selectOption({label:'Option 2'});
    await expect(dropDownMenu).toHaveValue('2');

    //await context.tracing.stop({path:'./test-results/Dropdown_trace.zip'})

});