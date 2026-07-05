// define functions
function myFunc() {
  console.log('hello from myFunc');
}

// call functions
// myFunc();

// params
function greet(username) {
  console.log(`greetings, ${username}! I've been waiting for you.`);
}

// greet('Yair');
// greet();

// default params
function greet2(username = 'user') {
  console.log(`greetings, ${username}! I've been waiting for you.`);
}

// greet2();

// local vs global vars
let user = 'paul';

function someFunc() {
  // console.log(user); // referenceError
  let user = 'tiferet';
  console.log(user); // tiferet
}

// someFunc();

// console.log(user); // paul

// exercise 1

// 1. Create a structured HTML file linked to a JS file
// 2. Write a Javascript function that takes a parameter: myAge
// 3. In the function, console.log the age of my mum and my dad. My mum is twice my age, and my dad is 1.2 the age of my mum.
// 4. Call the function.

function famAges(myAge) {
  const mumAge = myAge * 2;
  const dadAge = mumAge * 1.2;
  console.log(`Mum is ${mumAge} years old, and Dad is ${dadAge}.`);
}

// famAges(20);
// famAges(10);
// famAges(50);
  
// return
function addStuff(a, b) {
  return a + b;
}

const result = addStuff(9, 10);

console.log(addStuff(result, 15));

// exercise 2

// 1. Create a structured HTML file linked to a JS file
// 2. Write a Javascript function that takes a parameter: myAge
// 3. In the function, return the age of my mum (my mum is twice my age)
// 4. Call the function
// 5. In the global scope, console.log the result of the function

function familyMatters(myAge) {
  return myAge * 2;
}

const mum = familyMatters(24);
console.log(mum);