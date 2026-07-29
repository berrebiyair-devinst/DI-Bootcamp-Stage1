//=========================================
// ASYNCHRONOUS JAVASCRIPT - NOTES
//=========================================

// 1. Callback
// Une fonction passée en argument à une autre fonction.
// Elle sera exécutée plus tard.

function hello(callback){
    callback();
}

hello(() => {
    console.log("Bonjour");
});


//=========================================
// 2. Promise
// Une Promise représente le résultat futur
// d'une opération asynchrone.

// Etats :
// pending   -> en attente
// fulfilled -> réussie
// rejected  -> échouée

const promise = new Promise((resolve, reject) => {

    const success = true;

    if(success){
        resolve("Success");
    }else{
        reject("Error");
    }

});


//=========================================
// 3. Consommer une Promise

promise
.then(result => {
    console.log(result);
})
.catch(error => {
    console.log(error);
})
.finally(() => {
    console.log("Always executed");
});


//=========================================
// 4. Chaining (.then)

Promise.resolve(5)

.then(number => {
    return number * 2;
})

.then(number => {
    return number + 1;
})

.then(number => {
    console.log(number); //11
});


//=========================================
// 5. Promise avec setTimeout

function wait(){

    return new Promise(resolve => {

        setTimeout(() => {
            resolve("Finished!");
        },2000);

    });

}

wait().then(result => console.log(result));


//=========================================
// 6. async / await

async function test(){

    const result = await wait();

    console.log(result);

}

test();


//=========================================
// 7. try / catch avec await

async function test2(){

    try{

        const result = await wait();

        console.log(result);

    }catch(error){

        console.log(error);

    }

}


//=========================================
// 8. Promise.all()

const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
const p3 = Promise.resolve("C");

Promise.all([p1,p2,p3])

.then(results => {

    console.log(results);

});

// ["A","B","C"]


//=========================================
// 9. Promise.allSettled()

Promise.allSettled([p1,p2,p3])

.then(results => {

    console.log(results);

});


//=========================================
// 10. Promise.race()

Promise.race([p1,p2,p3])

.then(result => {

    console.log(result);

});


//=========================================
// A retenir
//
// Callback     -> fonction appelée plus tard
// Promise      -> résultat futur
// resolve()    -> succès
// reject()     -> erreur
// .then()      -> succès
// .catch()     -> erreur
// .finally()   -> toujours
// async        -> autorise await
// await        -> attend une Promise
// Promise.all()        -> attend toutes
// Promise.allSettled() -> attend toutes même en erreur
// Promise.race()       -> première Promise terminée
//=========================================

// ---

// À retenir pour les exercices :

// - **GET = je demande**
// - **POST = je crée**
// - **PUT = je modifie**
// - **DELETE = je supprime**

// Et surtout :

// `fetch()` = Promise → `.then()` / `.catch()`


// ---

// Petite remarque pour toi : cette partie est beaucoup plus facile maintenant que tu as fait les Promises. Avant fetch aurait été flou, mais maintenant tu sais déjà pourquoi on fait :

// ```javascript
// fetch(url)
// .then(response => response.json())
// .then(data => ...)

// # Node.js

// ## Définition

// Node.js est un environnement qui permet d'exécuter JavaScript en dehors d'un navigateur.

// Avant :
// JavaScript → navigateur

// Avec Node.js :
// JavaScript → serveur / ordinateur


// ## Pourquoi Node.js ?

// Node.js permet de créer :

// - des serveurs web
// - des APIs
// - des applications backend
// - des programmes qui manipulent des fichiers


// ## Caractéristiques principales

// ### Asynchrone

// Node.js peut gérer plusieurs tâches en même temps grâce aux Promises, callbacks et event loop.


// ### Non bloquant

// Node.js ne bloque pas l'exécution du programme pendant une opération longue.


// ### Event-driven

// Node.js fonctionne avec des événements et des callbacks.


// ## V8 Engine

// Node.js utilise le moteur JavaScript V8 de Google Chrome pour exécuter le code JavaScript.


// # Modules Node.js

// ## fs (File System)

// Permet de lire et écrire des fichiers.

// Exemple :

// ```javascript
// const fs = require("fs");

// # CORS (Cross-Origin Resource Sharing)

// ## Définition

// CORS est un mécanisme de sécurité du navigateur qui permet à un serveur d'autoriser ou refuser des requêtes provenant d'une autre origine.


// ## Origine

// Une origine =

// - protocole
// - domaine
// - port


// Exemple :

// http://localhost:3000

// et

// http://localhost:5173

// sont deux origines différentes.


// # Same-Origin Policy

// Le navigateur bloque par défaut les requêtes entre différentes origines pour protéger les utilisateurs.


// Exemple :

// Un site pirate ne doit pas pouvoir accéder aux données d'un autre site.


// # Pourquoi utiliser CORS ?

// Certaines applications ont un frontend et un backend séparés.

// Exemple :

// Frontend :
// localhost:5173

// Backend :
// localhost:3000

// CORS permet leur communication.


// # Fonctionnement

// Le serveur répond avec des headers HTTP.


// ## Access-Control-Allow-Origin

// Définit les origines autorisées.


// ## Access-Control-Allow-Methods

// Définit les méthodes autorisées :

// GET
// POST
// PUT
// DELETE


// ## Access-Control-Allow-Headers

// Définit les headers acceptés.


// # Preflight request

// Pour certaines requêtes complexes, le navigateur envoie d'abord une requête OPTIONS pour vérifier les permissions.


// # CORS avec Node.js

// Installation :

// npm install cors


// Utilisation :

// ```javascript
// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());

// app.listen(3000);