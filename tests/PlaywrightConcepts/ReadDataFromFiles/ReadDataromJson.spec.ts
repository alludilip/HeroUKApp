const jsonStr1 =
    '{"name": "GeeksforGeeks", "desc": "A Computer Science Portal for Geeks"}';
const jsonStr2 =
    '{"name": "Google", "desc": "Searching Platform", "workforce": 2000}';

type parseType = {
    name: string,
    desc: string,
    workforce?: number,
};

const parsedStr1: parseType =
    JSON.parse(jsonStr1);
const parsedStr2: parseType =
    JSON.parse(jsonStr2);

console.log(`Company Name: 
            ${parsedStr1.name}, 
            Description: 
            ${parsedStr1.desc}`);
console.log(`Company Name: 
            ${parsedStr2.name}, 
            Description: ${parsedStr2.desc}, 
            Work Force: ${parsedStr2.workforce}`);