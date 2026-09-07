//Exersise 1

class Employee {
    private name: string;
    private salary: number;
    public position: string;
    protected department: string;
    constructor(name: string, salary: number, position: string, department: string) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }
    public getEmployeeInfo(): string {
        return `Name: ${this.name}, Position: ${this.position}`;
    }
}

//Exersise2
class Product {
    readonly id: number;
    public name: string;
    public price: number;
    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
    getProductInfo(): string {
        return ` Name: ${this.name}, Price: $${this.price}`;
}

}

const product = new Product(1, "Laptop", 999.99);
console.log(product.getProductInfo());
// product.id = 2; // This will cause an error because 'id' is readonly

// Exersise 3
class Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    makeSound(): string {
        return "Some sound";
    }
}
class Dog extends Animal {
    
    makeSound(): string {
        return "Woof!";
    }
}

const dog = new Dog("Rex");
console.log(dog.makeSound()); // Output: "Woof!"

// Exersise 4
interface User {
    readonly id: number;
    email: string;
    name: string;
}

interface PremiumUser extends User {
    membershipLevel?: string;
}
function printUserDetails(user: PremiumUser): string {
    return `User ID: ${user.id}, Name: ${user.name}, Email: ${user.email} Membership Level: ${user.membershipLevel ?? "N/A"}`;
}

const premiumUser: PremiumUser = { id: 1, email: "email@gmail.com", name: "Yair", membershipLevel: "Gold" };
printUserDetails(premiumUser);