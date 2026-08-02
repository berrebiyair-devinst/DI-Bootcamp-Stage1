console.log("Star Wars AJAX Challenge");


// ===============================
// 1. RÉCUPÉRER LES ÉLÉMENTS DU DOM
// ===============================

const button = document.querySelector("#button");
const nameElement = document.querySelector("#name");
const heightElement = document.querySelector("#height");
const genderElement = document.querySelector("#gender");
const birthYearElement = document.querySelector("#birth-year");
const homeWorldElement = document.querySelector("#home-world");


// ======================================
// 2. RÉCUPÉRER UN PERSONNAGE ALÉATOIRE
// ======================================

function getInfo() {

    // Afficher le chargement
    updateWithLoading();

    // Nombre aléatoire entre 1 et 83
    const randomNumber = Math.floor(Math.random() * 83) + 1;

    const apiUrl =
        `https://www.swapi.tech/api/people/${randomNumber}`;

    // Créer une nouvelle requête AJAX
    const xhr = new XMLHttpRequest();

    // Préparer la requête
    xhr.open("GET", apiUrl);

    // Demander une réponse JSON
    xhr.responseType = "json";

    // Envoyer la requête
    xhr.send();


    // Quand la réponse est reçue
    xhr.onload = function () {

        if (xhr.status !== 200) {

            updateInfoWithError();
            console.log(`Error: ${xhr.status}`);

            return;
        }

        // Avec swapi.tech, les informations du personnage
        // se trouvent dans result.properties
        const character = xhr.response.result.properties;

        // Récupérer le monde d'origine
        getHomeWorld(character);
    };


    // En cas d'erreur réseau
    xhr.onerror = function () {

        updateInfoWithError();
        console.log("Network error");

    };
}


// ======================================
// 3. RÉCUPÉRER LE MONDE D'ORIGINE
// ======================================

function getHomeWorld(character) {

    const xhrPlanet = new XMLHttpRequest();

    // character.homeworld contient l'URL de la planète
    xhrPlanet.open("GET", character.homeworld);

    xhrPlanet.responseType = "json";

    xhrPlanet.send();


    xhrPlanet.onload = function () {

        if (xhrPlanet.status !== 200) {

            updateInfoWithError();
            console.log(`Planet error: ${xhrPlanet.status}`);

            return;
        }

        // Les informations de la planète sont aussi
        // dans result.properties
        const planet = xhrPlanet.response.result.properties;

        // Afficher le personnage et la planète
        updateInfo(character, planet.name);
    };


    xhrPlanet.onerror = function () {

        updateInfoWithError();
        console.log("Planet network error");

    };
}


// ======================================
// 4. AFFICHER LES INFORMATIONS
// ======================================

function updateInfo(character, planetName) {

    nameElement.innerText = character.name;

    heightElement.innerText =
        `Height: ${character.height}`;

    genderElement.innerText =
        `Gender: ${character.gender}`;

    birthYearElement.innerText =
        `Birth Year: ${character.birth_year}`;

    homeWorldElement.innerText =
        `Home World: ${planetName}`;
}


// ======================================
// 5. AFFICHER UNE ERREUR
// ======================================

function updateInfoWithError() {

    nameElement.innerText =
        "Oh No! That person isn't available.";

    heightElement.innerText = "";
    genderElement.innerText = "";
    birthYearElement.innerText = "";
    homeWorldElement.innerText = "";
}


// ======================================
// 6. AFFICHER LE CHARGEMENT
// ======================================

function updateWithLoading() {

    nameElement.innerHTML = `
        <i class="fa-solid fa-spinner fa-spin"></i>
        <p>Loading...</p>
    `;

    heightElement.innerText = "";
    genderElement.innerText = "";
    birthYearElement.innerText = "";
    homeWorldElement.innerText = "";
}


// ======================================
// 7. ÉVÉNEMENT DU BOUTON
// ======================================

button.addEventListener("click", getInfo);