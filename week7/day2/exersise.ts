
//ex1
let message: string = "Hello, World!";
console.log(message);



//ex2
let age: number = 25;
let nam: string = "Alice";
console.log(`Name: ${nam}, Age: ${age}`);

//ex3
let id: string | number = 123;
console.log(id);

//ex4
function fct(number: number): string {
    if (number > 0) {
        return "Positive";
    } else if (number < 0) {
        return "Negative";
    } else {
        return "Zero";
    }
}

//ex5
function getDetails(name:string,age:number):[string,number,string]{
    return [name, age, `welcome ${name} you are ${age} years old`];
}

getDetails("Yair", 22);

//ex6
type Person = {
    name: string;
    age: number;
};

function createPerson(name: string, age: number): Person {
    return {
        name,
        age
    };
}

console.log(createPerson("Yair", 22));

//ex8
function getAction(role: string): string {

    switch (role) {

        case "admin":
            return "Access all features";

        case "editor":
            return "Edit content";

        case "user":
            return "View content";

        case "guest":
            return "Limited access";

        default:
            return "Unknown role";
    }

}

console.log(getAction("admin"));
console.log(getAction("editor"));
console.log(getAction("user"));
console.log(getAction("guest"));
console.log(getAction("test"));
//ex9
// Surcharges
function greet(): string;
function greet(name: string): string;

// Implémentation
function greet(name?: string): string {

    if (name) {
        return `Hello ${name}!`;
    }

    return "Hello!";
}

// Tests
console.log(greet());
console.log(greet("Yair"));