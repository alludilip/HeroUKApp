import {test,expect} from '@playwright/test'

test('Palindrome', async()=>{

    let str = ['aaaa', "madam", "dilip", "flips"];
    let palindromes = [];

    for(let s of str){
        s = s.toLowerCase();
        
    let flag = true;
    let len = s.length;

    for(let i=0;i<len/2;i++){
        if(s[i]!=s[len-i-1]){
            flag=false;
            break;
        }
    }

    if(flag===true){
        console.log(`The string provided ${s} is palindrome`)
    }
    else{
        console.log(`The string provided ${s} is not palindrome`)
    }

 }
    
})


test('Check duplicates in array', async()=>{
    let strArray = ["data", "data", "test", "test", "value", "multi"];
    let set1 = new Set();
    let duplicates:string[] = [];

    for(let s of strArray){
        
        if(set1.has(s)){
            duplicates.push(s);
        }
        else{
            set1.add(s);
        }
    }

    // To delete all the duplicate elements in the array
    for(let s of duplicates){
        strArray.splice(strArray.indexOf(s),1)
    }

    console.log(set1);
    console.log(`duplicates in the array are ${duplicates}`);
    console.log(strArray);
    console.log(`Number of duplicate elements in the array are ${duplicates.length}`);
    console.log(`Number of unique elements in the array are ${set1.size}`);

})

test('Find even numbers', ()=>{
    let nums = [12,33,43,25,36,31,99,15];

    let evens = nums.filter(num=>num%2==0);
    let odds = nums.filter(num=>num%2!=0);
    console.log(evens);
    console.log(odds);

    let str = ["Dilip", "Welcome", "madam", "malayalam", "element"];
    
    let newstr:string[] = str.filter(s=>s.startsWith('ma'));
    console.log(newstr);

})

test('Reduce functions', ()=>{
    let vals = [14,2,3,4,11,5];
    let sum = vals.reduce((sum,val)=>sum+=val)
    console.log(sum);

    // Find largest string

    let max = Number.MAX_VALUE;
    let min = Number.MIN_VALUE;

    max = vals.reduce((max,val)=>max<val?max=val:max);
    console.log(max)

     min = vals.reduce((min,val)=>min>val?min=val:min);
    console.log(min)

})

test('Map function', ()=>{
    let nums = [10,20,30,40,50];

    let numsIncreased = nums.map(val=>val*2)
    console.log(numsIncreased);

    let str:string[] = ["dilip", "Test", "vaLue", "matCh"];
    str = str.map(s=>s.toLowerCase());
    console.log(str);
})