import { test, expect } from '@playwright/test';

/*
If we have browser authentication we can do it in 2 ways:
  1. By giving the credentials directly in the url
  2. By passing credentials in the context creation itself as parameters
*/


test('Basic Authentication', async ({browser }) => {

    const context1 = await browser.newContext(
      {httpCredentials:{username:'admin', password:'admin'}}
   );

   const page =await context1.newPage();
    
    // create locator for Basic Authentication hyperlink
    const basicAuthLink = page.getByRole('link', { name: 'Basic Auth' });
    const successMessage = page.getByRole('heading', { name: 'Congratulations! You must have the proper credentials.'});
    const success = page.getByText('Congratulations! You must');
    // Navigate to the page and wait for it to load
    //await page.goto('https://admin:admin@the-internet.herokuapp.com/');

    await page.goto('https://the-internet.herokuapp.com/');

    // Click on the "Basic Authentication" link and wait for the page to load
    await basicAuthLink.click();
    
    // check if success message is displayed
    //await expect(successMessage).toBeVisible();await page.getByText('Basic Auth (user and pass:').click();
    await expect(success).toHaveText("Congratulations! You must have the proper credentials.", {ignoreCase:true, timeout:10000});
    await expect(success).toContainText("Congratulations!", {ignoreCase:true, timeout:10000});

    // Take screenshot of the success page
    await page.screenshot({path: './tests/WebAppTests/Screenshots/BasicAuthSuccess-page.png', fullPage:true})

});

test('Handling dropdown button',async({page})=>{

    const dropDownLink = page.getByRole('link', {name:'Dropdown'});
    const dropDownMenu = page.locator("//select[@id='dropdown']");

    await dropDownLink.click();
    await dropDownMenu.selectOption({value:'1'});
    await expect(dropDownMenu).toHaveValue('1');

    await dropDownMenu.selectOption({label:'Option 2'});
    await expect(dropDownMenu).toHaveValue('2');

    await dropDownMenu.selectOption({index:1});
    await expect(dropDownMenu).toHaveValue('1');
    
    await dropDownMenu.selectOption({index:2});
    await expect(dropDownMenu).toContainText('Option 2');

});


test('Handling dragAndDrop',async({page})=>{

    const dropDownLink = page.getByRole('link', {name:'Drag and Drop'});
    const dragElement = page.locator("//div[@id='column-a']");
    const dropElement = page.locator("//div[@id='column-b']");
    dropDownLink.click();
    await dragElement.dragTo(dropElement);

});

test('Hovers - Mouse actions',async({page})=>{

    const hoverLink = page.getByRole('link', {name:'Hovers'});

    const image1 = page.getByAltText("user Avatar").first();
    const image2 = page.getByAltText("user Avatar").nth(1);
    const image3 = page.getByAltText("user Avatar").last();

    const user1 = page.locator("//*[contains(text(),'user1')]");
    const user2 = page.locator("//*[contains(text(),'user2')]");
    const user3 = page.locator("//*[contains(text(),'user3')]");
    
    // Mouse click options
    hoverLink.click({button:'left'});
    // hoverLink.click({button:'middle'});
    // hoverLink.click({button:'right'});
    //hoverLink.dblclick();

    // Mouse hover over elements
    await image1.hover();
    await expect(user1).toBeVisible();

    await image2.hover();
    await expect(user2).toBeVisible();

    await image3.hover();
    await expect(user3).toBeVisible();

});


test('Dynamic Controls - Assertions',async({page})=>{

    const dynamicControlsLink = page.getByRole('link', {name:'Dynamic Controls'});

    const checkBoxField = page.getByText('A checkbox');
    const RemoveButton = page.getByRole('button', { name: 'Remove' });
    const enableButton = page.getByRole('button', { name: 'Enable' });
    const textField = page.getByRole('textbox');
    const itsGoneText = page.getByText('It\'s gone!');
    const disableButton = page.getByRole('button', { name: 'Disable' });

    // Navigate to Dynamoic controls page
    await dynamicControlsLink.click();

    // Wait for state to be visible , others include hidden, attached and Detached
    await page.getByRole('heading', { name: 'Dynamic Controls' }).waitFor({state:"visible"})
    
    // Check checkbox fields visibility and hidden properties
    await expect(checkBoxField).toBeVisible();
    await RemoveButton.click();
    
    await expect(itsGoneText).toBeVisible();

    // Using soft assertion to assert without stopping the tests
    await expect.soft(checkBoxField).toBeVisible();
    await expect(checkBoxField).toBeHidden();

    // Check textfield fields if enabled or disabled
    await expect(textField).toBeDisabled();
    await enableButton.click();
    await expect(textField).toBeEnabled();
    await textField.fill("Test");

    await textField.click();
    await textField.press("Control+A");
    await textField.press("Backspace");
    
    await disableButton.click();
    await expect(textField).toBeDisabled();
    
});

    // Handling tables
    test('Tables', async({page})=>{
        
        const tablesLink = page.getByRole('link', { name: 'Sortable Data Tables' })
        
        await tablesLink.click();
        await page.getByRole('heading', { name: 'Data Tables' }).waitFor({state:'visible'});

        const tableRows = page.locator("//*[@id='table1']//tbody//tr");
        const noOfRows = tableRows.count();
        let email: string|null
        let webSite:string|null;
        let nameInput = "Conway";

        // Using nth() element
        for(let i =1; i<=await noOfRows;i++){
            const nameInTable = await page.locator(`//*[@id='table1']//tbody//tr[${i}]//td[1]`).textContent();
            if(nameInTable === nameInput){
                email = await page.locator(`//*[@id='table1']//tbody//tr[${i}]//td[3]`).textContent();
                webSite=await page.locator(`//*[@id='table1']//tbody//tr[${i}]//td[5]`).textContent();
                console.log(`email ID of person is ${email} and website is ${webSite}`)
                await page.locator(`//*[@id='table1']//tbody//tr[${i}]//td//a[@href='#delete']`).click();
                await expect(page).toHaveURL("https://the-internet.herokuapp.com/tables#delete");
                break;
            }
            
        }
        //console.log(`email ID of person is ${email} and website is ${webSite}`)
        console.log(await page.url());

    });

     // Visual Testing in playwright
    test('Visual testing', async({page})=>{
        
        const floatingMenuLink = page.getByRole('link', { name: 'Drag and Drop' })
        
        await floatingMenuLink.click({timeout:10000}); // Passes only if action is completed within 10 secs
        
        
        await expect(page).toHaveScreenshot('DragAndDrop.png'); // First time it will fail as screenshot is not yet created. It will create under snapshot folder and compares next time
        await page.goBack();

        const elementalSeleniumLink = page.getByRole('link', {name:'Elemental Selenium'});
        await expect(elementalSeleniumLink).toHaveScreenshot('ElementalSelenium.png');

    });

    // Handling multiple browsers/Tabs in same execution
    test('Multiple browser contexts', async({page, browser})=>{

        await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
        
        // Creating a new browser window and opening a new url to that
        const context = await browser.newContext();
        const page2 = await context.newPage();
        await page2.goto("https://jqueryui.com/datepicker/");

        // Adding new tabs to the browser
        const newTab = await context.newPage();
        await newTab.goto("https://the-internet.herokuapp.com/drag_and_drop");

    });

    // Handling alerts
    test('Alerts', async({page})=>{
        
        const alertsLink = await page.getByRole('link', {name:'JavaScript Alerts'});
        await alertsLink.click();
        const jsAlertButton = await page.getByRole('button', {name:'Click for JS Alert'});
        const jsConfirmButton = await page.getByRole('button', {name:'Click for JS Prompt'});
        
        await jsAlertButton.click();

        page.once('dialog', HandleDialog=>{
            console.log(HandleDialog.message); // Prints the message inside the dialog box
            HandleDialog.accept(); 
            // HandleDialog.dismiss(); // To click on cancel button
            console.log(HandleDialog.type()); // Prints the type - Alert, Confirm, prompt
        })

        await jsConfirmButton.click();
        page.once('dialog', async(dialog) => {
            await dialog.accept("test"); // To enter text inside the text field and click on ok button
        })


    })


    test('Status Codes check', async({page}) =>{

    const statusCodesLink = page.getByRole('link', {name:'Status Codes'});
    const statusCodesheading = page.getByRole('heading', {name:'Status Codes'});
    const hereLink = page.getByText("here", {exact:true});

    const CodeLink200 = page.getByRole('link', {name:'200'});
    const statusCodeData200 = page.locator("//p[contains(text(),'This page returned')]");

    await statusCodesLink.click();
    await expect(statusCodesheading).toBeVisible({timeout:10000});
    
    await hereLink.click();
    await page.goBack();
    
    await CodeLink200.click();
    await expect(statusCodeData200).toBeVisible();
    await page.goBack();

});


test('Add/Delete Item', async ({ page }) => {
    
    // create locator for Add/Remove hyperlink
    const addRemoveLink = page.getByRole('link', { name: 'Add/Remove Elements' });
    const addElementButton = page.getByRole('button', { name: 'Add Element' });
    const deleteButton = page.getByRole('button', { name: 'Delete' });
    
    // await page.waitForURL('https://the-internet.herokuapp.com/');

    // Click on the "Add/Remove Elements" link and wait for the page to load
    await addRemoveLink.click();

    // Click the "Add Element" button and verify that the "Delete" button is visible
    await addElementButton.click();
    await expect(deleteButton).toBeVisible();

    // Click the "Delete" button and verify that it is no longer visible
    await deleteButton.click();
    await expect(deleteButton).not.toBeVisible();

    // Screenshot of whole page after adding and deleting item
    await page.screenshot({ path: './tests/WebAppTests/Screenshots/addDeleteItem-page.png' });

    // Screenshot of only the "Add Element" button after adding and deleting item
    await addElementButton.screenshot({ path: './tests/WebAppTests/Screenshots/addElement-button-element.png' });

});