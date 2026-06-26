import random

list_of_numbers = [random.randint(0, 10000) for _ in range(20000)]
target_number = 3728

# Trouver toutes les paires
seen = set()
pairs = set()

for nombre in list_of_numbers:
    complement = target_number - nombre
    if complement in seen:
        paire = (min(nombre, complement), max(nombre, complement))
        pairs.add(paire)
    seen.add(nombre)

# Afficher les paires
for a, b in pairs:
    print(f"{a} and {b} sums to the target_number {target_number}")