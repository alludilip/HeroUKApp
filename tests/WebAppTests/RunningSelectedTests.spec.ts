import { test, expect } from '@playwright/test'

test.describe('Smoke Tests', () => {
     // Add tests belonging to smoke tests

     test('Smoke test 1',{tag:['@LoginTest']} , async ({ page }) => {

     });

     test('Smoke test 2', {tag:['@LoginTest']} , async ({ page }) => {

     });

})

test.describe('Sanity Tests', () => {
     // Add tests belonging to smoke tests
     test.skip('Sanity test 1',async ({ page }) => {

     });

     test.skip('Sanity test 2', {tag:['@LoginTest','@QuickTest']} ,async ({ page }) => {

     });

})

// This will skip execution of the test in this file
test.skip('Skipping this test', async ({ page }) => {

});


test.only('Running test1', async ({ page }) => {
     await expect(true).toBe(false);
});

// The tests with only function are executed and others are ignored
test.only('Running test2', async ({ page }) => {

});

// The tests with only function are executed and others are ignored
test.only('Running test3', async ({ page }) => {

});


// To run the tests using tags use-  npx playwright test --grep '@LoginTest'
// To run tests repeated number of times use- npx playwright test --grep '@LoginTest' --repeat-each=2
// To run any specific spec file use - npx playwright test .\tests\WebAppTests\RunningSelectedTests.spec.ts
// npx playwright test --last-failed

// Parameterize tests

const inputArray = ["user1", "user2", "user3"];

for(let user of inputArray){
     test(`parametrized test for ${user}`, async({page})=> {
          console.log(`completed test for ${user}`)
     })
}
