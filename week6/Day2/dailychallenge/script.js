// 1. Récupérer les éléments HTML
const form = document.getElementById("gifForm");
const categoryInput = document.getElementById("category");
const gifContainer = document.getElementById("gifContainer");
const deleteAllButton = document.getElementById("deleteAll");


// 2. Fonction async qui récupère un GIF aléatoire
const getRandomGif = async (category) => {

    // encodeURIComponent protège la recherche s'il y a des espaces
    // ou des caractères spéciaux
    const url = `https://api.giphy.com/v1/gifs/random?api_key=hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My&tag=${encodeURIComponent(category)}`;

    try {

        const response = await fetch(url);

        // Vérifier si la requête a réussi
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        // Transformer la réponse JSON en objet JavaScript
        const result = await response.json();

        console.log(result);

        // Vérifier qu'un GIF a bien été reçu
        if (!result.data || !result.data.images) {
            throw new Error("Aucun GIF trouvé pour cette catégorie.");
        }

        // Récupérer l'adresse du GIF
        const gifUrl = result.data.images.original.url;

        // Créer une div qui contiendra le GIF et son bouton
        const gifCard = document.createElement("div");

        // Créer l'image
        const image = document.createElement("img");
        image.src = gifUrl;
        image.alt = `GIF de la catégorie ${category}`;
        image.width = 300;

        // Créer le bouton SUPPRIMER
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "SUPPRIMER";

        // Supprimer seulement ce GIF
        deleteButton.addEventListener("click", () => {
            gifCard.remove();
        });

        // Ajouter l'image et le bouton dans la carte
        gifCard.appendChild(image);
        gifCard.appendChild(deleteButton);

        // Ajouter la carte dans la page
        gifContainer.appendChild(gifCard);

    } catch (error) {

        console.log(error);

        alert(error.message);
    }
};


// 3. Événement de soumission du formulaire
form.addEventListener("submit", (event) => {

    // Empêche la page de se recharger
    event.preventDefault();

    // Récupérer et nettoyer la valeur du champ
    const category = categoryInput.value.trim();

    // Vérifier que le champ n'est pas vide
    if (category === "") {
        alert("Veuillez entrer une catégorie.");
        return;
    }

    // Appeler la fonction
    getRandomGif(category);

    // Vider le champ après la recherche
    categoryInput.value = "";
});


// 4. Supprimer tous les GIF
deleteAllButton.addEventListener("click", () => {

    gifContainer.innerHTML = "";
});