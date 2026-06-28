// 1. Create a numerically indexed table (ie. an array): pets, like this ['cat','dog','fish','rabbit','cow']

const pets = ['cat', 'dog', 'fish', 'rabbit', 'cow'];

// 2. Display dog

console.log(pets[1]);

// 3. Add to the array pets, the pet horse. Remove the pet rabbit
// my edit: replace 'rabbit' with 'horse'

// pets.splice(3, 1, 'horse');

// version 2 using indexOf()
pets.splice(pets.indexOf('rabbit'), 1, 'horse');

// 4. Display the array length
console.log(pets.length);

console.log(pets);