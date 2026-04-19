/*

Playwright:
  1. Developed by Microsoft. Opensource.
  2. Can be used for Functional Testing, API testing. (only modern wenb applications)

Architecture:
  1. Uses client server architecture communicating over single persistent WebSocket connection.
  2. Client layer - Write tests using Playwright's API bindings using TS/JS, Java, .Net or python. Converted into JSON for communication
  3. Core/Server Layer - Core/brain of playwright running as Node.js. Converts JSON instructions to browser compatible instructions.
     Handles built in synchronization and auto waits. For chrome it uses chromDevTools protocol. For Webkit and firefox it uses W1 protocol.
  4. Browser Layer: Uses actual browsers (Chromium, Firefox and WebKit).
  
Advantages compared to Selenium:
   1. Auto wait mechanisms. WebSocket communication improves speed and stability.
   2. Inbult Test Runner: Parallel runner, assertions, Grouping mechanisms, retry mechanism. No need of tool like TestNG.
   3. Inbuilt Reporting: Can use html, json reporting. Easy integration with allure reporter.
   4. Driver management: All drivers are installed and managed better.
   5. Better Debugging support - Traceviewer, Screenshots and videos can be retained on failure.
   6. Browser context allows multiple isolated logins and executions. Also allows retain loginstate for all tests.

Disadvantages:
   1. No mobile automation support
   2. Does not support legacy Internet explorer.
   3. Does not provide features for test ordering, priority and dependent tests like in TestNG. Although can be achieved differently.
   
   How to execute tests in an order:
   1. Disable parallel in playwright.config.ts. set workers to 1 
   2. Either name the spec files in order like 01xxx.spec.ts 02xxx.spec.ts
   3. Or use test.list.ts to order the tests as your wish

   import { test } from '@playwright/test';
   import featureBTests from './feature-b.spec.ts';
   import featureATests from './feature-a.spec.ts';

   test.describe(featureBTests);
   test.describe(featureATests);

   import { defineConfig } from '@playwright/test';

   export default defineConfig({
   workers: 1,
   testMatch: 'test.list.ts',
   });




*/