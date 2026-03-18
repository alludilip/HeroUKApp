import {test, expect, defineConfig } from '@playwright/test';

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

test('ReadingDataFromENVFile', async({page})=>{
    const url = process.env.BASE_URL;
    const user = process.env.USERNAME;
    await page.goto(`${url}`);
});

test('ReadingDataFromJsonFile', async({page})=>{
    const url = process.env.BASE_URL;
    const user = process.env.USERNAME;
    await page.goto(`${url}`);
});