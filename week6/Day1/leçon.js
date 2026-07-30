// // // # Async / Await

// // // ## async

// // // Une fonction déclarée avec `async` retourne toujours une Promise.

// // // ```javascript
// // // async function hello(){
// // //     return "Hello";
// // // }
// // // ```

// // // Retour :

// // // ```text
// // // Promise { "Hello" }
// // // ```

// // // ---

// // // ## await

// // // Le mot-clé `await` attend qu'une Promise soit terminée avant de continuer.

// // // ```javascript
// // // const value = await promise;
// // // ```

// // // `await` retourne la valeur résolue de la Promise.

// // // ---

// // // ## Exemple

// // // ```javascript
// // // function getUsername(){
// // //     return Promise.resolve("John");
// // // }

// // // async function display(){

// // //     const user = await getUsername();

// // //     console.log(user);

// // // }

// // // display();
// // // ```

// // // Résultat :

// // // ```text
// // // John
// // // ```

// // // ---

// // // ## await remplace souvent .then()

// // // Avec `.then()` :

// // // ```javascript
// // // getUsername().then(user => console.log(user));
// // // ```

// // // Avec `await` :

// // // ```javascript
// // // const user = await getUsername();
// // // console.log(user);
// // // ```

// // // ---

// // // ## Gestion des erreurs

// // // Avec `.then()` :

// // // ```javascript
// // // fetchData()
// // // .catch(error => console.log(error));
// // // ```

// // // Avec `async/await` :

// // // ```javascript
// // // try{

// // //     const data = await fetchData();

// // // }

// // // catch(error){

// // //     console.log(error);

// // // }
// // // ```

// // // ---

// // // ## À retenir

// // // - `async` → transforme une fonction en fonction asynchrone.
// // // - `await` → attend la fin d'une Promise.
// // // - `await` ne peut être utilisé que dans une fonction `async`.
// // // - `try...catch` remplace souvent `.catch()` avec `async/await`.
// // // - `await` rend le code plus lisible que les chaînes de `.then()`.



// // 1. fetch(url)

// // ↓

// // Le navigateur envoie une demande au serveur

// // ↓

// // 2. Promise (pending)

// // ↓

// // Le serveur réfléchit...

// // ↓

// // 3. Promise (fulfilled)

// // ↓

// // 4. response

// // ↓

// // 5. response.json()

// // ↓

// // 6. Les vraies données JavaScript


// ========================
// AJAX / FETCH
// ========================

// AJAX = Asynchronous JavaScript And XML
// Aujourd'hui on échange surtout du JSON.

// AJAX permet :
// - communiquer avec un serveur
// - récupérer des données
// - envoyer des données
// - sans recharger la page

// ========================
// FETCH
// ========================

// fetch(url)

// → retourne une Promise

// Donc :

// fetch(url)
// .then(...)
// .catch(...)

// ou

// await fetch(url)

// ========================
// RESPONSE
// ========================

// fetch()

// ↓

// Response

// ↓

// response.json()

// ↓

// Objet JavaScript

// response.json() retourne aussi une Promise.

// ========================
// Schéma classique
// ========================

// fetch(url)
// .then(response => {
//     if(response.ok){
//         return response.json();
//     }
//     throw new Error("Erreur");
// })
// .then(data => {
//     console.log(data);
// })
// .catch(error => {
//     console.log(error);
// });

// ========================
// Méthodes HTTP
// ========================

// GET    → récupérer des données

// POST   → créer / envoyer

// PUT    → modifier

// DELETE → supprimer

// ========================
// À retenir
// ========================

// fetch() → Promise

// response → informations du serveur

// response.json() → Promise

// data → vraies données JavaScript