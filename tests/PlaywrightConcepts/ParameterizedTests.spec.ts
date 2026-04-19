import { test, expect } from '@playwright/test';

/*
Parameterize helps to run the same tests with multiple values, some times it is also called as data-driven testing.
Playwright allows parameterization, you can use data from either csv, json or plain arrays. 
To implement parameterization you need to use for or foreach loop.
*/

const loginData = [
  { username: 'user1', password: 'pass1', expected: 'success' },
  { username: 'user2', password: 'wrong', expected: 'failure' },
];

test.describe('Login Data-Driven Tests', () => {
  for (const data of loginData) {
    test(`Login with ${data.username} should be ${data.expected}`, async ({ page }) => {
      // Test logic using 'data.username' and 'data.password'
    });
  }
});