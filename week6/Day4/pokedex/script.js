let currentPokemonID = 1;



const randomButton = document.getElementById("random");

randomButton.addEventListener("click", getRandomPokemon);

async function getRandomPokemon() {
    const loadingElement = document.getElementById("loading");
    loadingElement.textContent = "Loading...";

    try {
        const randomId = Math.floor(Math.random() * 150) + 1;

        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const pokemonData = await response.json();

        // Sauvegarder l'id actuel
        currentPokemonID = randomId;

        loadingElement.textContent = "";
        displayPokemonInfo(pokemonData);

    } catch (error) {
        loadingElement.textContent = "";
        console.error(error);

        document.getElementById("pokemonInfo").textContent =
            "Oh no! This Pokémon is not available...";
    }
}



const previousButton = document.getElementById("previous");

previousButton.addEventListener("click", getPreviousPokemon);

async function getPreviousPokemon() {
    const loadingElement = document.getElementById("loading");
    loadingElement.textContent = "Loading...";

    try {

        if (currentPokemonID <= 1) {
            throw new Error("No previous Pokémon available");
        }

        const previousId = currentPokemonID - 1;

        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${previousId}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const previousPokeData = await response.json();

        //  Mise à jour de l'id
        currentPokemonID = previousId;

        loadingElement.textContent = "";
        displayPokemonInfo(previousPokeData);

    } catch (error) {
        loadingElement.textContent = "";
        console.error(error);
    }
}



const nextButton = document.getElementById("next");

nextButton.addEventListener("click", getNextPokemon);

async function getNextPokemon() {
    const loadingElement = document.getElementById("loading");
    loadingElement.textContent = "Loading...";

    try {

        if (currentPokemonID >= 150) {
            throw new Error("No next Pokémon available");
        }

        const nextId = currentPokemonID + 1;

        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${nextId}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const nextPokeData = await response.json();

        //  Mise à jour de l'id
        currentPokemonID = nextId;

        loadingElement.textContent = "";
        displayPokemonInfo(nextPokeData);

    } catch (error) {
        loadingElement.textContent = "";
        console.error(error);
    }
}

function displayPokemonInfo(pokemonData) {
    const pokemonInfoDiv = document.getElementById("pokemonInfo");
    pokemonInfoDiv.innerHTML = `
        <h2>${pokemonData.name}</h2>
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p>Height: ${pokemonData.height}</p>
        <p>Weight: ${pokemonData.weight}</p>
        <p> ID: ${pokemonData.id}</p>
        <p>Type: ${pokemonData.types[0].type.name}</p>
    `;
}