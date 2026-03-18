import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend<{
    savelogs:void;
}>({

  savelogs: [async ({}, use) => {
    // Setup: Runs once per worker process
    console.log("Global before is run")
    await use();
    // Teardown: Runs once after all tests in the worker
    console.log("Global after is run")
  }, 
  { auto: true }],
});


/*
The above is the implementation of global fixture for global before each test and after each test
In the example.spec.ts we need to import {test} from this this file for the spec file to make use of these fixtures.

Example is - checkBoxesRadioPOM.spec
*/