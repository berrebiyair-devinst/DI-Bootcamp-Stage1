// Create a structured HTML file linked to a JS file

// 1. Create these variables and give them values:

const addressNumber = 8;
const addressStreet = 'Bezalel';
const country = 'Israel';

// 2. Write a variable named globalAddress, and concatenate inside, the variables:

// addressNumber
// addressStreet
// country

// const globalAddress = addressNumber + ' ' + addressStreet + ', ' + country;
const globalAddress = `${addressNumber} ${addressStreet}, ${country}`;

// In order to create a sentence
// 3. Display globalAddress Example: globalAddress should display « I live in 55 av Bosquet, in Paris »

console.log(globalAddress);