import re

MATRIX_STR = '''
7ir
Tsi
h%x
i ?
sM# 
$a 
#t%
'''

rows = MATRIX_STR.splitlines()

message = ""

# Calculer le nombre de colonnes automatiquement
columns = max(len(row) for row in rows)

# Lire colonne par colonne
for col_index in range(columns):
    for row in rows:
        if col_index < len(row):
            message += row[col_index]

# Remplacer les groupes de symboles par un espace
message = re.sub(r'[^a-zA-Z]+', ' ', message)

print(message.strip())
