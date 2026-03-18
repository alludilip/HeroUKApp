import { test, expect } from '@playwright/test';

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