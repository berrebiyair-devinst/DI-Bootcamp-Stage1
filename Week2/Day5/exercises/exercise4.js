// Create a stuctured html file linked to a JS file

// 1. Create an object that has properties "username" and "password". Fill those values in with strings.
const unsecuredUserNameAndPassword = {
  username: '8steps',
  password: 'password1234'
};

// 2. Create an array which contains the object you have made above, and name the array "database".
const database = [unsecuredUserNameAndPassword];

// 3. Create an array called "newsfeed" which contains 3 objects with properties "username" and "timeline".
const newsfeed = [
  { username: 'helloWorld', timeline: 'MCU' },
  { username: 'superman', timeline: '0' },
  { username: 'armageddon', timeline: 'the future' }
];