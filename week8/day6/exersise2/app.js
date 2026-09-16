import {personn} from "./data.js";

function averageAge(persons) {
    let totalAge = 0;
   
    persons.forEach(person => {
        totalAge += person.age;
    })

    return totalAge / persons.length;
    
}

console.log(averageAge(personn));