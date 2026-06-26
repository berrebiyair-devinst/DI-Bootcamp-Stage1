board = [[' ' for col in range(3)] for ligne in range(3)]


def display_board(plateau):
    print('  0   1   2')
    for i, ligne in enumerate(plateau):
        print(i, ' | '.join(ligne))
        if i < 2:
            print(' ---+---+---')

def player_input(player, board):
    while True:
        # Demander la ligne et la colonne
        ligne = int(input(f"Joueur {player}, entre le numéro de ligne (0, 1, 2) : "))
        col = int(input(f"Joueur {player}, entre le numéro de colonne (0, 1, 2) : "))

        # Vérifier si c'est dans la plage valide
        if ligne not in [0, 1, 2] or col not in [0, 1, 2]:
            print("Position invalide ! Choisis entre 0 et 2.")

        # Vérifier si la cellule est vide
        elif board [ligne][col] != ' ':
            print(" Cette case est déjà prise !")

        # Tout est bon
        else:
            return ligne, col
        
def check_win(board, player):
    
    # Vérifier les lignes
    for ligne in board:
        if ligne[0] == player and ligne[1] == player and ligne[2] == player:
            return True

    # Vérifier les colonnes
    for col in range(3):
        if board[0][col] == player and board[1][col] == player and board[2][col] == player:
            return True

    # Vérifier diagonale gauche droite
    if board[0][0] == player and board[1][1] == player and board[2][2] == player:
        return True

    # Vérifier diagonale droite gauche
    if board[0][2] == player and board[1][1] == player and board[2][0] == player:
        return True

    # Aucune combinaison gagnante
    return False



def check_draw(board):
    for ligne in board:
        for case in ligne:
            if case == ' ':  # il reste une case vide
                return False
    return True  # toutes les cases sont occupées

def play():
    # Initialiser le board
    board = [[' ' for col in range(3)] for ligne in range(3)]
    
    # Joueurs
    player = "X"
    
    while True:
        # Afficher le board
        display_board(board)
        
        # Récupérer le coup du joueur
        ligne, col = player_input(player, board)
        
        # Mettre à jour le board
        board[ligne][col] = player
        
        # Vérifier si le joueur a gagné
        if check_win(board, player):
            display_board(board)
            print(f"Joueur {player} a gagné !")
            break
        
        # Vérifier match nul
        if check_draw(board):
            display_board(board)
            print("Match nul !")
            break
        
        # Changer de joueur
        if player == "X":
            player = "O"
        else:
            player = "X"

# Lancer le jeu
play()