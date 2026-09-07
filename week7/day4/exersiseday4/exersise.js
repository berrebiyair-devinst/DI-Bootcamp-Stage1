"use strict";
//Exersise 1
class Employee {
    name;
    salary;
    position;
    department;
    constructor(name, salary, position, department) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    getEmployeeInfo() {
        return `Name: ${this.name}, Position: ${this.position}`;
    }
}
//Exersise2
class Product {
    id;
    name;
    price;
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    getProductInfo() {
        return ` Name: ${this.name}, Price: $${this.price}`;
    }
}
const product = new Product(1, "Laptop", 999.99);
console.log(product.getProductInfo());
// product.id = 2; // This will cause an error because 'id' is readonly
// Exersise 3
class Animal {
    name;
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        return "Some sound";
    }
}
class Dog extends Animal {
    makeSound() {
        return "Woof!";
    }
}
const dog = new Dog("Rex");
console.log(dog.makeSound()); // Output: "Woof!"
// Exersise 4
class Calculator {
    static add(a, b) {
        return a + b;
    }
    static subtract(a, b) {
        return a - b;
    }
}
;
Calculator.add(5, 3); // Returns 8
Calculator.subtract(5, 3); // Returns 2
function printUserDetails(user) {
    return `User ID: ${user.id}, Name: ${user.name}, Email: ${user.email} Membership Level: ${user.membershipLevel ?? "N/A"}`;
}
const premiumUser = {
    id: 1,
    email: "email@gmail.com",
    name: "Yair",
    membershipLevel: "Gold"
};
printUserDetails(premiumUser);
