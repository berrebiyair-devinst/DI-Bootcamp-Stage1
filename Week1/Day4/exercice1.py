# Exercice 1 : Favorite Number

from ast import If, Store
from tokenize import String


my_fav_number= {1,2,3,4,5,6,7,8,9}

additional_numbers = {10, 11, 12}

my_fav_number.update(additional_numbers)
print(my_fav_number)

my_fav_number.remove(11)
print(my_fav_number)
friend_fav_number = {13, 14, 15}
our_fav_number = my_fav_number.union(friend_fav_number)
print(our_fav_number)

#exercice 2 : Tuples

my_tuple = (1, 2, 3, 4, 5)
#we don't can change the value of a tuple, but we can ccreate a new tulpe"

#Exercice 3 : List Manipulation

basket = ["Banana", "Apples", "Oranges", "Blueberries"]

basket.remove("Banana")
print(basket)
basket.append("Kiwi")
print(basket)
insert_index = 0
basket.insert(insert_index, "Apples")
print(basket)
print(basket.count("Apples"))
basket.clear()
print(basket)

#Exercice 4 : Floats

#" A float is a number that has a decimal point. It can be positive or negative. Floats are used to represent real numbers, which can be fractions or whole numbers. In Python, floats are represented using the float data type. The difference between a float and an integer is that an integer is a whole number without a decimal point, while a float can have a decimal point and can represent fractional values. For example, 3 is an integer, while 3.14 is a float."

numbers = []

for i in range(3, 11):
    number = i / 2
    if number.is_integer():
        number = int(number)
    numbers.append(number)

print(numbers)

#Exercice 5: For Loop

numbers=[]
for i in range (1,21):
    numbers.append(i)
    print(numbers)

for i in range (1, 21):
    if i % 2 == 0:
        print(i)

        

#Exercice 6: While Loop


while True :
    name= input("Enter your name :")

    if name.isdigit() or len(name)< 3:
      print("give the correct name")
      continue

    print("Thanks")
    break


# Exerice 7:


fruits = input("Enter your fruits preferates (separated by spaces):")

fruit_favor = fruits.split()

fruit =input("Enter your fruit:")

if fruit in fruit_favor:
      print("Enjoy")
else:
      print("chose new")

#  Exercice 8
# cretaion d'un elkiste vide pour mettre les toppings
 
toppings =[]
price = 10
while True:
    topping = input("Enter your topping (or 'quit' to stop):")

    if topping == "quit":
      break
    
    toppings.append(topping)
    print(f"adding {topping} to your pizza")

    print("\nYour pizza toppings:")
    for topping in toppings:
     print(f"-{topping}")
    price += 2.5

print(f"Totale price:{price}$")

#Exercice 9
total=0
while True:
    age = input("Enter your age:")

    if age == "0":
         break
    
    age = int(age) #converti strings en integrate (str,bol)

    if age < 3:
          total += 0
          print("free!")

    elif age > 3 and age < 12:
          total += 10
          print("10$")
    else:
          total+=15
          print("15$")
        
    print(f"Total price : {total}")

      #Bonus
my_liste=[]

while True:
    age = int(input("Enter your age :"))
   

    if age== 0:
        break
    if age < 16 :
        print("no possible")
    else:
        my_liste.append(age)

    print(f"{my_liste}")

   

 


 