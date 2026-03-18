import {test, expect} from '@playwright/test'

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

test('DatePicker', async({page})=>{
    let month = "June";;
    let year ="2027";
    let day =14;

    await page.goto("https://jqueryui.com/datepicker/");

    // identifying the frame where elements are available
    const iframeElement = page.frameLocator("//iframe[@class='demo-frame']");

    // Identifying elements inside the iframe
    const datePickerField = iframeElement.locator("//input[@id='datepicker']");

    await datePickerField.click();

    const datePickerMonth = iframeElement.locator("//span[@class='ui-datepicker-month']");
    const datePickerYear = iframeElement.locator("//span[@class='ui-datepicker-year']");
    const NextMonthButton = iframeElement.locator("//span[@class='ui-icon ui-icon-circle-triangle-e']");
    const dateLocator = iframeElement.locator(`//a[@data-date='${day}']`)

    let monthInApp = await datePickerMonth.textContent();
    let yearInApp = await datePickerYear.textContent();

    // Selecting the month in calendar
    while(!(yearInApp===year)){
        await NextMonthButton.click();
        yearInApp = await datePickerYear.textContent();
    }

    // Selecting the month in calendar
    while(!(monthInApp===month)){
        await NextMonthButton.click();
        monthInApp = await datePickerMonth.textContent();
    }

    await dateLocator.click();

});