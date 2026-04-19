import { test, expect } from '@playwright/test';

/*
Key Properties and Methods
The TestInfo object exposes several useful properties and methods documented in the Playwright API documentation: 
testInfo.title: The title of the currently running test.
testInfo.status: The current status of the test (e.g., 'passed', 'failed', 'skipped').
testInfo.retry: The current retry number of the test (0 for the first run).
testInfo.project: The resolved configuration for the test's project.
testInfo.timeout: The current timeout value for the test.
testInfo.annotations: A list of annotations applicable to the test, which can be modified dynamically.
testInfo.attachments: A list of files or buffers attached to the test run.
testInfo.outputDir: The directory where test-related output files are stored.
testInfo.parallelIndex: The index of the worker process running the test, useful for parallel execution scenarios (e.g., handling unique accounts per worker).
testInfo.attach(name, options): A method used to attach files, screenshots, or other data (like a screenshot's body as a PNG) to the test report, making debugging easier.
testInfo.fail(): Marks the test as "should fail", ensuring Playwright treats it as a pass only if it actually fails.
testInfo.slow(): Marks the test as slow and triples the test timeout to avoid premature failures. 
*/


test('example test with testInfo', async ({ page }, testInfo) => {
    await page.goto('https://playwright.dev/');
    // Use testInfo to attach a screenshot on failure, or generally for reporting
    if (testInfo.status === 'failed') {
        const screenshot = await page.screenshot();
        testInfo.attach('screenshot-on-failure', { body: screenshot, contentType: 'image/png' });
    }

    // You can also use testInfo.attach in the middle of a test for general reporting
    const name = await page.innerText('.navbar__title');
    testInfo.attach('page-title-info', { body: `The page title is: ${name}`, contentType: 'text/plain' });

    expect(name).toBe('Playwright');
});