/*
========================================
        JAVASCRIPT AVANCÉ - MÉMO
========================================

=====================
1. HTTP
=====================

HTTP = Le protocole qui permet au navigateur de communiquer avec un serveur.

Navigateur
     ↓ (HTTP Request)
Serveur
     ↓ (HTTP Response)
Navigateur

Une requête = le navigateur demande quelque chose.
Une réponse = le serveur répond.


=====================
2. LES MÉTHODES HTTP
=====================

GET
→ Sert à récupérer des données.

Exemple :
GET https://api.exemple.com/users

POST
→ Sert à envoyer des données.

Exemple :
POST https://api.exemple.com/users


=====================
3. CODES HTTP
=====================

200 → OK (succès)
401 → Non connecté
403 → Accès refusé
404 → Page introuvable
500 → Erreur du serveur


=====================
4. FORMULAIRES
=====================

<form action="/login" method="POST">

action
→ Où envoyer les données.

method
→ Comment envoyer les données.

GET
→ Les données sont visibles dans l'URL.

POST
→ Les données sont envoyées dans le corps de la requête.

name
→ Nom de la donnée envoyée au serveur.

Exemple :

<input name="username">

Le serveur reçoit :

username = Yair


=====================
5. JSON
=====================

JSON = Format utilisé pour échanger des données entre le navigateur et le serveur.

Objet JavaScript

{
    name: "Yair",
    age: 21
}

JSON

{
    "name":"Yair",
    "age":21
}


=====================
6. JSON.stringify()
=====================

Objet JavaScript
        ↓
JSON.stringify()
        ↓
Chaîne JSON (string)

Exemple :

const user = {
    name: "Yair"
};

const json = JSON.stringify(user);

typeof json
// string


=====================
7. JSON.parse()
=====================

Chaîne JSON
        ↓
JSON.parse()
        ↓
Objet JavaScript

Exemple :

const json = '{"name":"Yair"}';

const user = JSON.parse(json);

typeof user
// object

/*
========================================
        EXCEPTIONS
========================================

try
→ J'essaie d'exécuter du code.

catch(err)
→ Capture une erreur si elle existe.

finally
→ S'exécute toujours.

Exemple :

try {

    // code

} catch(err){

    console.log(err.message);

} finally{

    console.log("Toujours exécuté");

}


=====================
throw
=====================

throw permet de créer une erreur.

Exemple :

if(age < 18){
    throw new Error("You must be 18 years old");
}


=====================
Les erreurs
=====================

err.name
→ Nom de l'erreur

err.message
→ Message de l'erreur

Exemple :

ReferenceError
TypeError
SyntaxError


=====================
À retenir
=====================

try
→ J'essaie.

catch
→ Je récupère l'erreur.

throw
→ Je crée une erreur.

finally
→ Toujours exécuté.
/*
========================================
        REGULAR EXPRESSIONS (RegEx)
========================================

Une RegEx sert à :

→ rechercher du texte
→ vérifier un format

Exemple :

const regex = /hello/i;

regex.test("Hello");
// true


=====================
Le i
=====================

i
→ Ignore les majuscules/minuscules.

Exemple :

/hello/i

fonctionne avec :

hello
Hello
HELLO


=====================
test()
=====================

Retourne :

true
ou
false

Exemple :

const regex = /chat/i;

regex.test("Mon chat");
// true


=====================
match()
=====================

Retourne ce qui a été trouvé.

Exemple :

let str = "Happy BirthDay";

str.match(/birthday/i);


=====================
Utilisations
=====================

✔ Vérifier un e-mail

✔ Vérifier un mot de passe

✔ Vérifier un numéro de téléphone

✔ Chercher un mot dans une phrase


=====================
À retenir
=====================

RegEx
→ modèle de recherche

test()
→ true / false

match()
→ retourne le résultat trouvé

*/

