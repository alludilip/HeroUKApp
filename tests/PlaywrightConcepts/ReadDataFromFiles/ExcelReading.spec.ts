import { test, expect } from '@playwright/test'
import path from 'path'
import { readExcelFile } from '../ReadDataFromFiles/ExcelReaderUtility'

test('ReadingDataFromExcel', async ({ page }) => {
    const filepath = path.join('C:/Users/Z9FI/OneDrive - Eurofins IT-ST07/Documents/PlayWrightTesting/HeroUKApp/TestData.xlsx');
    const records = readExcelFile(filepath);

    console.log(records);

    console.log("Please find below the main skills of this user");

    for(let i =0; i<records.length; i++){
        console.log(`Primary Skill${i+1} of the user is ${records[i].Skill1}`)
    }

    console.log("Please find below the secondary skills of this user");

     for(let i =0; i<records.length; i++){
        console.log(`Secondary Skill${i+1} of the user is ${records[i].Skill2}`)
    }


})