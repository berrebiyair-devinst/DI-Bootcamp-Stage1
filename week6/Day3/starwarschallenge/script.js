// Récupérer les éléments du DOM
const button = document.querySelector("#button");
const nameElement = document.querySelector("#name");
const heightElement = document.querySelector("#height");
const genderElement = document.querySelector("#gender");
const birthYearElement = document.querySelector("#birth-year");
const homeWorldElement = document.querySelector("#home-world");


// Récupérer un personnage et sa planète
async function getInfo() {
    updateWithLoading();

    try {
        const randomNumber = Math.floor(Math.random() * 83) + 1;

        const characterUrl =
            `https://www.swapi.tech/api/people/${randomNumber}`;

        // Récupérer le personnage
        const characterResponse = await fetch(characterUrl);

        if (!characterResponse.ok) {
            throw new Error(
                `Character error: ${characterResponse.status}`
            );
        }

        const characterData = await characterResponse.json();

        const character = characterData.result.properties;

        // Récupérer la planète
        const homeWorldResponse = await fetch(character.homeworld);

        if (!homeWorldResponse.ok) {
            throw new Error(
                `Home world error: ${homeWorldResponse.status}`
            );
        }

        const homeWorldData = await homeWorldResponse.json();

        const planetName =
            homeWorldData.result.properties.name;

        updateInfo(character, planetName);

    } catch (error) {
        console.error(
            "Error fetching Star Wars data:",
            error
        );

        updateInfoWithError();
    }
}


// Afficher les informations
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


// Afficher le chargement
function updateWithLoading() {
    nameElement.innerHTML = "";

    const icon = document.createElement("i");
    icon.className = "fa-solid fa-spinner fa-spin";

    const text = document.createElement("p");
    text.innerText = "Loading...";

    nameElement.appendChild(icon);
    nameElement.appendChild(text);

    heightElement.innerText = "";
    genderElement.innerText = "";
    birthYearElement.innerText = "";
    homeWorldElement.innerText = "";
}


// Afficher une erreur
function updateInfoWithError() {
    nameElement.innerText =
        "Oh No! That person isn't available.";

    heightElement.innerText = "";
    genderElement.innerText = "";
    birthYearElement.innerText = "";
    homeWorldElement.innerText = "";
}


// Lancer la recherche au clic
button.addEventListener("click", getInfo);