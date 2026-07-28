// ==============================
// PROMISES - MEMO
// ==============================

// Une Promise représente une tâche qui prendra du temps.
// Elle a 3 états :

// 1. Pending (En attente)
// La tâche est en cours.

// 2. Fulfilled (Résolue)
// La tâche a réussi -> resolve()

// 3. Rejected (Rejetée)
// La tâche a échoué -> reject()


// Création d'une Promise

let promise = new Promise((resolve, reject) => {

    let success = true;

    if (success) {
        resolve("Task completed!");
    } else {
        reject("Task failed!");
    }

});


// Si la Promise réussit
promise.then((result) => {
    console.log(result);
});


// Si la Promise échoue
promise.catch((error) => {
    console.log(error);
});


// ==============================
// RESUME
// ==============================

// new Promise()  -> Créer une Promise
// resolve()      -> Succès
// reject()       -> Erreur
// .then()        -> Exécuté si resolve()
// .catch()       -> Exécuté si reject()


// Schéma mental :

// Je lance une tâche
//        |
//        v
//     Pending
//        |
//   --------------
//   |            |
// Succès      Erreur
//   |            |
// resolve()   reject()
//   |            |
// .then()    .catch()
// ===============================
// CALL STACK
// ===============================

// Stocke les fonctions en cours d'exécution.
// Fonctionne en LIFO (Last In First Out).

// ===============================
// SYNCHRONOUS
// ===============================

// JavaScript exécute une seule instruction à la fois.
// Chaque fonction attend que la précédente soit terminée.

// ===============================
// WEB APIs
// ===============================

// Le navigateur gère les tâches longues.
// Exemples :
// - setTimeout()
// - fetch()
// - addEventListener()

// ===============================
// CALLBACK QUEUE
// ===============================

// Les callbacks terminés attendent ici.
// Fonctionne en FIFO (First In First Out).

// ===============================
// EVENT LOOP
// ===============================

// Vérifie si la Call Stack est vide.
// Si oui, il prend le premier callback de la Queue
// et le place dans la Call Stack.

// Schéma :

// Web APIs
//      ↓
// Callback Queue
//      ↓
// Event Loop
//      ↓
// Call Stack

// ===============================
// CALLBACK HELL
// ===============================

// Les callbacks permettent d'attendre la fin
// d'une opération asynchrone.

// Exemple :

getMeat((meat) => {
    getBuns((buns) => {
        makeBurger(meat, buns);
    });
});

// Quand plusieurs callbacks sont imbriqués,
// le code devient difficile à lire.

// On appelle cela le Callback Hell
// (ou Pyramid of Doom).

// ===============================
// PROMISES
// ===============================

// Les Promises remplacent les callbacks
// imbriqués par un enchaînement avec .then()

getMeat()
    .then(getBuns)
    .then(makeBurger)
    .catch(error => console.log(error));

// Avantages :
// - Code plus lisible
// - Plus facile à maintenir
// - Gestion des erreurs avec un seul .catch()
// ===============================
// PROMISES - MÉMO
// ===============================

// Créer une Promise

let promise = new Promise((resolve, reject) => {

    let success = true;

    if (success) {
        resolve("Success");
    } else {
        reject("Error");
    }

});

// then()
// Exécuté si la Promise réussit.

promise.then(result => {

    console.log(result);

});

// catch()
// Exécuté si la Promise échoue.

promise.catch(error => {

    console.log(error);

});

// finally()
// Toujours exécuté.

promise.finally(() => {

    console.log("Finished");

});

// ===============================
// PROMISE CHAINING
// ===============================

// Chaque .then() reçoit le return du précédent.

myPromise
    .then(result => {
        return result + 10;
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.log(error);
    });

// ===============================
// Promise.all()
// Attend que toutes les Promises réussissent.

// Promise.allSettled()
// Attend toutes les Promises,
// qu'elles réussissent ou échouent.

// Promise.resolve(value)
// Crée une Promise déjà résolue.

// Promise.reject(error)
// Crée une Promise déjà rejetée.

// Promise.race()
// Le premier qui arrive gagne


// Une Promise représente le résultat futur d'une opération asynchrone.
// Elle possède 3 états :
// pending → en attente
// fulfilled → réussite avec resolve()
// rejected → échec avec reject()

// then() récupère le résultat d'une Promise réussie.
// catch() récupère les erreurs.
// finally() s'exécute dans tous les cas.

// Les Promises permettent d'éviter le callback hell
// et de gérer les opérations asynchrones avec un code plus lisible.