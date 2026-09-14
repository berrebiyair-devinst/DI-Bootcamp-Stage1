
// EXERCISE 1 

type Person = {
    name: string;
    age: number;
};

type Address = {
    street: string;
    city: string;
};

type PersonWithAddress = Person & Address;

const personWithAddress: PersonWithAddress = {
    name: "Yair",
    age: 22,
    street: "Rothschild Street",
    city: "Tel Aviv"
};

console.log(personWithAddress);


// EXERCISE 2 


function describeValue(value: number | string): string {
    if (typeof value === "number") {
        return "This is a number";
    }

    return "This is a string";
}

console.log(describeValue(25));
console.log(describeValue("Hello"));


// EXERCISE 3 


let someValue: any = "Hello TypeScript";

let stringValue = someValue as string;

console.log(stringValue.toUpperCase());


// EXERCISE 4 


function getFirstElement(elements: (number | string)[]): string {
    return elements[0] as string;
}

const mixedArray1: (number | string)[] = ["Hello", 10, "World"];
const mixedArray2: (number | string)[] = ["TypeScript", 25, 50];

console.log(getFirstElement(mixedArray1));
console.log(getFirstElement(mixedArray2));



// EXERCISE 5 


function logLength<T extends { length: number }>(value: T): void {
    console.log(value.length);
}

logLength("Hello TypeScript");
logLength([1, 2, 3, 4, 5]);


// EXERCISE 6 


type Job = {
    position: string;
    department: string;
};

type Employee = Person & Job;

function describeEmployee(employee: Employee): string {
    if (employee.position === "Manager") {
        return `${employee.name} is a Manager in the ${employee.department} department`;
    }

    if (employee.position === "Developer") {
        return `${employee.name} is a Developer in the ${employee.department} department`;
    }

    return `${employee.name} has another position`;
}

const employee1: Employee = {
    name: "David",
    age: 30,
    position: "Manager",
    department: "Sales"
};

const employee2: Employee = {
    name: "Daniel",
    age: 25,
    position: "Developer",
    department: "IT"
};

console.log(describeEmployee(employee1));
console.log(describeEmployee(employee2));


// EXERCISE 7 


function formatInput<T extends { toString(): string }>(input: T): string {
    const formattedInput = input.toString() as string;
    return formattedInput;
}

console.log(formatInput(123));
console.log(formatInput("Hello"));
console.log(formatInput(true));