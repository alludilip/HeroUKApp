import {test, expect} from '@playwright/test'

test('Test1', async({page})=>{
    expect(10).toBeLessThan(2);
});

test('Test2', async({page})=>{
    expect(true).toBe(false);
});

test('Test3', async({page})=>{
    expect(true).toBe(false);
});

test('Test4', async({page})=>{
    expect(true).toBe(false);
});
