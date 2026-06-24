# Exercice1

keys = ['Ten', 'Twenty', 'Thirty']
values = [10, 20, 30]
dict ={}

for keys,values in zip(keys,values):
    dict[keys]= values
    print(dict)

#Exercice 2

family = {"rick": 43, 
         'beth': 13,
         'morty': 5, 
         'summer': 8
            }
total= 0
for name,age in family.items():
  
    if age < 3:
        prix=0
        print(f"{name}:free")
    elif age >=3 and age<=12:
        prix=10
        print(f"{name}:10$")
    else:
        prix=15
        print(f"{name}:15$")

    total += prix
    print(f"cout total : {total}$")
  
#Exercice 3
brand = {
    "name": 'Zara',
    "creation_date": 1975,
    "creator_name": "Amancio Ortega Gaona",
    "type_of_clothes": ["men", "women", "children", "home"],
    "international_competitors": ["Gap", "H&M", "Benetton"],
    "number_stores": 7000,
    "major_color": {
        "France": "blue",
        "Spain": "red",
        "US": ["pink", "green"]
    }
}
   
brand["number_stores"]=2
print(brand["type_of_clothes"])
brand["country_creation"]="spain"
print(brand)

if "international_competitors" in brand.keys():
    print(brand["international_competitors"])
brand["international_competitors"].append("Desigual")
print(brand)
del brand["creation_date"]
print(brand)
print(brand["international_competitors"][3])
print(brand["major_color"]["US"])

print(len(brand.keys()))
print(brand.keys())

more_on_zara = {
    "creation_date": 1975,
    "number_stores": 7000
    }

brand.update(more_on_zara)
print(brand)

#Exercice 4
users = ["Mickey", "Minnie", "Donald", "Ariel", "Pluto"]
my_personnage={}
my_personnage1={}
my_personnage2={}
for index,name in enumerate(users):
    my_personnage[name] = index
    print(my_personnage)

for index,name in enumerate(users):
    my_personnage1[index] = name
    print(my_personnage1)

for index,name in enumerate(sorted(users)):
    my_personnage2[name] = index
    print(my_personnage2)
