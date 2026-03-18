// Install xlsx package - npm install xlsx 

// Import xlsx
import * as Excel from 'xlsx';
import * as fs from 'fs'

// Define test Data structure
interface TestRecord{
    Skill1: String,
    Skill2: String
}

// Create method to read data from excel file
export function readExcelFile(filePath:string){
    
    // Read the excel file as binary string
    const fileData = fs.readFileSync(filePath);
    
    // Parse into the workbook
    const workBook = Excel.read(fileData);

    //Get the first worksheet
    const workSheet= workBook.Sheets[workBook.SheetNames[0]];

    // Convert the sheet into Json
    const rawData:any[] = Excel.utils.sheet_to_json(workSheet, {header:1})

    // Convert raw data into the test record type
    const records: TestRecord[] = rawData.slice(1).map((column:any)=> ({
        Skill1: column[0],
        Skill2: column[1]
    }))

    return records;
}

