#challenge1

mot=input('enter your world:')
dict={}

for index,letter in enumerate(mot):
   if letter in dict:
      dict[letter].append(index)
   else:
       dict[letter]= [index]
   print(dict)

#challenge 2
items_purchase = {"Water": "$1", "Bread": "$3", "TV": "$1000", "Fertilizer": "$20"}
wallet = "$300"

items_purchase = {"Water": "$1", "Bread": "$3", "TV": "$300"}

for item, prix in items_purchase.items():
    items_purchase[item] = prix.replace("$", "").replace(",", "")

print(items_purchase)

wallet=int(wallet.replace("$",""))
basket=[]

for articles, price in items_purchase.items():
    if int(price) <= int(wallet):
        basket.append(articles)
    
print(sorted(basket))  # trié alphabétiquement