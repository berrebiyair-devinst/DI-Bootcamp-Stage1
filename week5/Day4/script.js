// ==============================
// VARIABLES PRINCIPALES DU JEU
// ==============================

// Tableau qui représente les 9 cases du morpion
// Chaque position correspond à une case HTML
let board = ["", "", "", "", "", "", "", "", ""];


// Symbole choisi par le joueur (X ou O)
let playerSymbol = "";


// Symbole utilisé par l'ordinateur
let computerSymbol = "";


// Permet de bloquer le jeu quand quelqu'un gagne
let gameOver = false;



// ==============================
// COMBINAISONS GAGNANTES
// ==============================

// Toutes les possibilités pour gagner
const winCombos = [
    [0, 1, 2], // première ligne
    [3, 4, 5], // deuxième ligne
    [6, 7, 8], // troisième ligne

    [0, 3, 6], // colonne 1
    [1, 4, 7], // colonne 2
    [2, 5, 8], // colonne 3

    [0, 4, 8], // diagonale \
    [6, 4, 2]  // diagonale /
];



// ==============================
// CHOIX DU SYMBOLE
// ==============================

function chooseSymbol(symbol) {


    // Le symbole choisi devient celui du joueur
    playerSymbol = symbol;


    // L'ordinateur prend automatiquement l'autre symbole
    if (playerSymbol === "X") {

        computerSymbol = "O";

    } else {

        computerSymbol = "X";

    }


    // On démarre une nouvelle partie
    resetGame();

}



// ==============================
// BOUTONS X ET O
// ==============================


// Quand le joueur clique sur X
document.getElementById("play-x").addEventListener("click", () => {

    chooseSymbol("X");

});



// Quand le joueur clique sur O
document.getElementById("play-o").addEventListener("click", () => {

    chooseSymbol("O");

});




// ==============================
// CLIC SUR UNE CASE DU TABLEAU
// ==============================


function handleCellClick(event) {


    // Si le joueur n'a pas choisi X/O
    // ou si la partie est terminée
    // on arrête la fonction
    if (playerSymbol === "" || gameOver) {

        return;

    }



    // Récupère la case HTML cliquée
    const cell = event.target;



    // Transforme l'id HTML en nombre
    // Exemple : id="4" devient 4
    const cellIndex = Number(cell.id);



    // Vérifie si la case est déjà occupée
    if (board[cellIndex] !== "") {

        return;

    }



    // On ajoute le symbole du joueur dans le tableau JS
    board[cellIndex] = playerSymbol;



    // On affiche le symbole dans la page HTML
    cell.textContent = playerSymbol;



    // On vérifie si quelqu'un a gagné
    checkWinner();



    // Si personne n'a gagné,
    // l'ordinateur joue
    if (!gameOver) {

        computerMove();

    }

}




// ==============================
// ACTIVATION DES CLICS SUR LES CASES
// ==============================


// Récupère les 9 cases du tableau HTML
const cells = document.querySelectorAll("td");



// Pour chaque case
cells.forEach(cell => {


    // Quand on clique dessus,
    // on lance handleCellClick
    cell.addEventListener("click", handleCellClick);


});




// ==============================
// TOUR DE L'ORDINATEUR (FACILE)
// ==============================


function computerMove() {



    // On cherche les cases encore libres
    let emptyCells = board
        .map((cell, index) => {


            // Si la case est vide,
            // on retourne son numéro
            if (cell === "") {

                return index;

            }


        })


        // On enlève les valeurs undefined
        .filter(index => index !== undefined);




    // Choisit un index aléatoire
    // Exemple : 0,1,2,3...
    let randomIndex = Math.floor(
        Math.random() * emptyCells.length
    );



    // Récupère la vraie case où jouer
    let move = emptyCells[randomIndex];



    // Ajoute le symbole de l'ordinateur
    board[move] = computerSymbol;



    // Affiche le symbole dans la page
    document.getElementById(move).textContent = computerSymbol;



    // Vérifie le résultat
    checkWinner();

}




// ==============================
// VERIFICATION DU GAGNANT
// ==============================


function checkWinner() {



    // On parcourt toutes les combinaisons gagnantes
    for (let combo of winCombos) {



        // Déstructuration du tableau
        // Exemple : [0,1,2] devient a=0 b=1 c=2
        let [a, b, c] = combo;



        // Vérifie si les 3 cases sont identiques
        // et pas vides
        if (

            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]

        ) {



            // Affiche le gagnant
            document.getElementById("msg").textContent =
                `${board[a]} wins!`;



            // Bloque le jeu
            gameOver = true;



            return;

        }

    }




    // Si toutes les cases sont remplies
    // et personne n'a gagné
    if (!board.includes("")) {


        document.getElementById("msg").textContent =
            "Draw!";


        gameOver = true;

    }

}





// ==============================
// RESTART DU JEU
// ==============================


function resetGame() {



    // Vide le tableau JavaScript
    board = ["", "", "", "", "", "", "", "", ""];



    // Autorise le jeu
    gameOver = false;



    // Vide les cases HTML
    cells.forEach(cell => {

        cell.textContent = "";

    });



    // Efface le message
    document.getElementById("msg").textContent = "";

}