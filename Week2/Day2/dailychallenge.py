MATRIX_STR = '''
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%'''  

matrix= [list(ligne) for ligne in MATRIX_STR.strip().split("\n")]
print(matrix)


nb_colonnes = len(matrix[0])

for col in range(nb_colonnes):
    for ligne in matrix:
        if col < len(ligne):
            print(ligne[col])  # accès par [ligne][colonne]


resultat = ""

for col in range(nb_colonnes):
    for ligne in matrix:
        if col < len(ligne):
            char = ligne[col]
            if char.isalpha():  # vérifie si c'est une lettre
                resultat += char

message_final = ""

for col in range(nb_colonnes):
    colonne_temp = ""
    for ligne in matrix:
        if col < len(ligne):
            char = ligne[col]
            if char.isalpha():
                colonne_temp += char
            else:
                colonne_temp += " "  # symbole → espace
    message_final += colonne_temp

print(message_final)