import { test, expect } from '@playwright/test'

test.describe.configure({ mode: 'serial' , retries:2, timeout:30000})

/*
  Serial:
  The above applies only to the file it is declared. Useful for dependent tests
  If one test fails the following tests are skipped. Entire group is retried together
  Default: To run sequentially but not skip tests on failure
  parallel : All tests are executed parallely.
*/

test.describe('Smoke Tests', () => {
     // Add tests belonging to smoke tests

     test('Smoke test 1', { tag: ['@LoginTest'] }, async ({ page }) => {

     });

     test('Smoke test 2', { tag: ['@LoginTest'] }, async ({ page }) => {

     });

})

test.describe('Sanity Tests', () => {
     // Add tests belonging to smoke tests
     test('Sanity test 1', async ({ page }) => {

     });

     test('Sanity test 2', { tag: ['@LoginTest', '@QuickTest'] }, async ({ page }) => {

     });

})

// This will skip execution of the test in this file
test.skip('Skipping this test', async ({ page }) => {

});

// The tests with only annotations are only executed.
test.only('Running test1', async ({ page }) => {
     await expect(true).toBe(false);
});

// Ensures tests are failed. if passed playwright will report an error.
test.fail('failing test', async ({ page }) => {
     test.fail();
     // ... test code ...
});

// Used to mark tests that needs attention. it skips the executions.
test.fixme('inprogress tests', async ({ page }) => {
     test.fail();
     // ... test code ...
});

// Used to mark tests that needs attention. it triples the default timeouts.
test('Slow Tests', async ({ page }) => {
     // ... test code ...

     let user = "user1";
     test.slow(user === "user1", `Exeuction is slow for ${user}`);
});

test.describe('slow group', () => {
     test.slow(); // Applies to all tests within this describe block
     test('test 1', async ({ page }) => { /* ... */ });
     test('test 2', async ({ page }) => { /* ... */ });
});


// To run the tests using tags use-  npx playwright test --grep '@LoginTest'
// To run tests repeated number of times use- npx playwright test --grep '@LoginTest' --repeat-each=2
// To run any specific spec file use - npx playwright test .\tests\WebAppTests\RunningSelectedTests.spec.ts
// To run last failed tests - npx playwright test --last-failed
// When connected to Github, this is used to run only modified tests - npx playwright test --only-changed  

// Parameterize tests

const inputArray = ["user1", "user2", "user3"];

for (let user of inputArray) {
     test(`parametrized test for ${user}`, async ({ page }) => {
          console.log(`completed test for ${user}`)
     })
}
