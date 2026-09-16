const _ = require("lodash");
const { add, multiply } = require("./math");

const sum = add(5, 3);
const product = multiply(4, 6);

console.log("Addition:", sum);
console.log("Multiplication:", product);

const numbers = [10, 20, 30, 40];

console.log("Lodash sum:", _.sum(numbers));
console.log("Lodash max:", _.max(numbers));