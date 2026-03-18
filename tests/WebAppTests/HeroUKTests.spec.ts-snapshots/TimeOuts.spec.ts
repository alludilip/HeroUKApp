import {test, expect} from '@playwright/test'


// Globally set the below in config.ts

    /*
    export default defineConfig({
    timeout: 60000, // Sets default test timeout to 60 seconds
    globalTimeout: 3600000, // Sets global timeout for test run to 1 hour
    use: {
        actionTimeout: 10000, // Sets default action timeout to 10 seconds
        navigationTimeout: 30000, // Sets default navigation timeout to 30 seconds
        expect: {
        timeout: 10000, // Sets default expect timeout to 10 seconds
        },
    },
    }); 
    */


    // This will skip execution of the test in this file
    test('Setting test timeouts', async ({ page }) => {
    
    test.setTimeout(35000); // This particular test has timeout of 35 secs
    page.waitForTimeout(1000) // sleeps for 1 sec

     // await floatingMenuLink.click({timeout:10000}); // Passes only if action is completed within 10 secs
     //  await floatingMenuLink.textContent({timeout:10000}); // Passes only if action is completed within 10 secs

});

    // test.slow() is an annotation used to triple the default timeout for a specific test when it is known to take longer than usual.
    test('Working on flaky slow tests', async ({ page }) => {
        test.slow();  // Triples the default timeout (e.g., from 30s to 90s)

    });