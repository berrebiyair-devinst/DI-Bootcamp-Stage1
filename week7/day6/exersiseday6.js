"use strict";
// EXERCISE 1 
const personWithAddress = {
    name: "Yair",
    age: 22,
    street: "Rothschild Street",
    city: "Tel Aviv"
};
console.log(personWithAddress);
// EXERCISE 2 
function describeValue(value) {
    if (typeof value === "number") {
        return "This is a number";
    }
    return "This is a string";
}
console.log(describeValue(25));
console.log(describeValue("Hello"));
// EXERCISE 3 
let someValue = "Hello TypeScript";
let stringValue = someValue;
console.log(stringValue.toUpperCase());
// EXERCISE 4 
function getFirstElement(elements) {
    return elements[0];
}
const mixedArray1 = ["Hello", 10, "World"];
const mixedArray2 = ["TypeScript", 25, 50];
console.log(getFirstElement(mixedArray1));
console.log(getFirstElement(mixedArray2));
// EXERCISE 5 
function logLength(value) {
    console.log(value.length);
}
logLength("Hello TypeScript");
logLength([1, 2, 3, 4, 5]);
function describeEmployee(employee) {
    if (employee.position === "Manager") {
        return `${employee.name} is a Manager in the ${employee.department} department`;
    }
    if (employee.position === "Developer") {
        return `${employee.name} is a Developer in the ${employee.department} department`;
    }
    return `${employee.name} has another position`;
}
const employee1 = {
    name: "David",
    age: 30,
    position: "Manager",
    department: "Sales"
};
const employee2 = {
    name: "Daniel",
    age: 25,
    position: "Developer",
    department: "IT"
};
console.log(describeEmployee(employee1));
console.log(describeEmployee(employee2));
// EXERCISE 7 
function formatInput(input) {
    const formattedInput = input.toString();
    return formattedInput;
}
console.log(formatInput(123));
console.log(formatInput("Hello"));
console.log(formatInput(true));
