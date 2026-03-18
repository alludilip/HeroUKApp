import { test, expect } from '@playwright/test';


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