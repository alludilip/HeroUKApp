import { defineConfig, devices } from '@playwright/test';

import testDataJson from '../HeroUKApp/tests/WebAppTests/TestData.json'
type TestData = {
    TestDataSet1:{
        Skill1:string,
        Skill2:string
    },
    "TestDataSet2":{
        Skill1:string,
        Skill2:string
    }
}
const typedTestData = testDataJson as TestData

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',

  timeout: 60000, // Sets default test timeout to 60 seconds
  globalTimeout: 3600000, // Sets global timeout for test run to 1 hour  
   expect: {
      timeout: 10000, // Sets default expect timeout to 10 seconds
    },  

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 :0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html'],
    ['allure-playwright'],
    ['json', {outputFile: 'playwright-report/json-test-report.json'}],
    ['junit', {outputFile: 'playwright-report/junit-test-report.xml'}],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',
     //baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    viewport: { width: 1920, height: 1080 }, // To maximize window especially for firefox/webkit
    launchOptions: { args: ['--start-maximized'] },
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000, // Sets default action timeout to 10 seconds
    navigationTimeout: 30000, // Sets default navigation timeout to 30 seconds
   
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], viewport:{width:1920, height:1080} },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    //   /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

  
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
