/*

import csvParser from 'csv-parser';
import fs from 'fs';

// Define the type for a single row of data
type RowData = {
    Name: string;
    Age: number; // Define the type as number if you convert it
    Occupation: string;
};

const filePath: string = 'data.csv';
const results: RowData[] = [];

fs.createReadStream(filePath)
    .pipe(csvParser({
        // Optional: specify a different delimiter if needed (default is comma)
        // separator: ';' 
    }))
    .on('data', (row: any) => {
        // Cast or convert data types as needed during processing
        row.Age = parseInt(row.Age, 10);
        results.push(row as RowData);
    })
    .on('end', () => {
        console.log('CSV file successfully processed.');
        console.log(results);
    })
    .on('error', (error: Error) => {
        console.error('An error occurred:', error.message);
    });

*/
