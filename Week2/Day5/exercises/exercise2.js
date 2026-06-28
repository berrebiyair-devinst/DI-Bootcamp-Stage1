// 1. Store your birth year in a variable.
const birthYear = 1865;
// 2. Store a future year in a variable.
const futureYear = 1999;
// 3. Calculate your possible ages for that year based on the stored values.
const age = futureYear - birthYear;
// 4. Display : "I will be NN in YYYY", substituting the values.
const sentence = `I will be ${age} in ${futureYear}!`;

console.log(sentence);