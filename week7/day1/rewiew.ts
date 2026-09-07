class Persone {
 private name : string;
 private age : number;

 constructor(name: string, age: number) {
  this.name = name;
  this.age = age;
 }
 public greet(): string {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
    public isAdult():boolean{
        if(this.age >= 18){
            return true;
        }
        return false;
    }
}

const yair = new Persone ("Yair", 22);
console.log(yair.greet());
console.log(yair.isAdult());

class Student extends Persone {
    protected studentID: string;

    constructor(name: string, age: number, studentID: string) {
        super(name, age);
        this.studentID = studentID;
    }
    public greet(): string {
        return super.greet() + ` I am student ${this.studentID}.`;
}}
const student = new Student("Yair", 22, "STU-123");
console.log(student.greet());
console.log(student.isAdult());

// | Notion             | À quoi ça sert ?                                 | Exemple                        |
// | ------------------ | ------------------------------------------------ | ------------------------------ |
// | `class`            | Créer un modèle d'objet                          | `class Person {}`              |
// | `constructor`      | Initialise l'objet lors du `new`                 | `constructor(name: string) {}` |
// | `this`             | Désigne l'objet actuel                           | `this.name = name`             |
// | `public`           | Accessible partout                               | `public name: string`          |
// | `private`          | Accessible **seulement dans la classe**          | `private age: number`          |
// | `protected`        | Accessible dans la classe **+ ses enfants**      | `protected id: string`         |
// | `readonly`         | Valeur initialisable mais ensuite non modifiable | `readonly id: string`          |
// | `extends`          | Une classe hérite d'une autre                    | `Student extends Person`       |
// | `super()`          | Appelle le constructeur du parent                | `super(name, age)`             |
// | `super.method()`   | Appelle une méthode du parent                    | `super.greet()`                |
// | Redéfinition       | L'enfant donne sa propre version d'une méthode   | `greet() { ... }`              |
// | `static` propriété | Appartient à la **classe**, pas aux objets       | `Student.count`                |
// | `static` méthode   | Méthode appelée directement sur la classe        | `Student.getCount()`           |
// | `abstract class`   | Classe modèle qu'on ne peut pas faire avec `new` | `abstract class Shape`         |
// | `abstract method`  | Oblige les enfants à implémenter une méthode     | `abstract getArea(): number;`  |


interface Car {
   make: string;
    model: string;
    year: string;
}
function getCarInfo(car: Car): string {
    return `${car.year} ${car.make} ${car.model}`;
}
 const myCar: Car = {
    make: "Toyota",
    model: "Camry",
    year: "2020"
 };
console.log(getCarInfo(myCar));

// | Notion                     | Signification                             | Exemple                            |
// | -------------------------- | ----------------------------------------- | ---------------------------------- |
// | `interface`                | Définit un **contrat / une structure**    | `interface User { name: string; }` |
// | `?`                        | Propriété **optionnelle**                 | `age?: number`                     |
// | `readonly`                 | Propriété non modifiable après création   | `readonly id: number`              |
// | Interface de fonction      | Impose paramètres + retour d'une fonction | `(a: number): string;`             |
// | `implements`               | Une **classe respecte une interface**     | `class Dog implements Animal`      |
// | `extends`                  | Une interface hérite d'une autre          | `interface Dog extends Animal`     |
// | Plusieurs interfaces       | Hériter de plusieurs contrats             | `extends A, B`                     |
// | Interface `extends` classe | Hérite de la structure d'une classe       | `interface X extends Control`      |
