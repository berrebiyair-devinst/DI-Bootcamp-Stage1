# Challenge 1

word = input("Enter your word: ")

letter_indices = {}

for index, letter in enumerate(word):
    if letter in letter_indices:
        letter_indices[letter].append(index)
    else:
        letter_indices[letter] = [index]

print(letter_indices)


# Challenge 2

items_purchase = {
    "Water": "$1",
    "Bread": "$3",
    "TV": "$1000",
    "Fertilizer": "$20"
}

wallet = "$300"

wallet = int(wallet.replace("$", ""))

basket = []

for item, price in items_purchase.items():
    price = int(price.replace("$", ""))

    if price <= wallet:
        basket.append(item)
        wallet -= price

if len(basket) == 0:
    print("Nothing")
else:
    print(sorted(basket))
