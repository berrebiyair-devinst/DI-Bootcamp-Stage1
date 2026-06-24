#1
number = int(input("your number"))
length = int(input("your length"))

list=[]
for i in range (1, lenght =+1):
    list.append(i*number)
    print(list)

    #2

mot = input("Entrez un mot : ")

resultat = ""

for i in range(len(mot)):
    if i == 0:  # première lettre, toujours ajoutée
        resultat += mot[i]
    elif mot[i] != mot[i-1]:  # si différente de la précédente
        resultat += mot[i]

print(resultat)