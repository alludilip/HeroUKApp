import { test, expect } from '@playwright/test';

import * as dotenv from 'dotenv';
dotenv.config();


/*
Reading from .env file
Install the dot env package - npm install dotenv
In the root directory of your project, create a file named .env and add your variables
Import and configure dotenv as early as possible in your main application file

*/

test('Reading from .env file', async ({ page }) => {
// Now you can access variables using process.env
const BASE_URL = process.env.BASE_URL;
const USERNAME = process.env.USERNAME;

console.log(`Base URL is ${BASE_URL} and Username is ${USERNAME}`);

});
