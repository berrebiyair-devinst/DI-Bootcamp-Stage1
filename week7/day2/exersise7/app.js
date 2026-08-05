"use strict";
// On récupère l'élément HTML.
// "as HTMLInputElement" indique à TypeScript qu'il s'agit bien d'un input.
const usernameInput = document.getElementById("username");
// Grâce à l'assertion de type, on peut utiliser la propriété value.
usernameInput.value = "Yair";
console.log(usernameInput.value);
