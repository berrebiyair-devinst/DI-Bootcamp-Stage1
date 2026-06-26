#Exercie1

def display_message():
    print("I am learning about functions in Python.")

display_message()

#Exercice 2
def favorite_book(title):
    print(f"One of my favorite books is {title}")

favorite_book("les miserables")   

# Exercice 3

def describe_city(city, country="uknow"):
    print( city  + "is in" + country)

describe_city("Ramat gan", "Israel")
describe_city("Jrerusalem", )
     

#Exercie 4
import random

def nombre(nombre):
    nombre_random = random.randint(1, 100)
    
    if nombre_random == nombre :
        print("Success! (if the numbers match)")
    else :
        print(f"Fail! Your number: {nombre}, Random number:{nombre_random} (if they don't match)")
nombre(78)

#Exercice 5
def marks_shirts(size,text):
   print(f"size:{size} and text:{text}")

marks_shirts("L","ILVP")

def marks_shirts(size ="large",text="I love Python"):
    print(f"size:{size} and text:{text}")

marks_shirts()
marks_shirts("M")
marks_shirts("XL", "Merciiiiiiii")
marks_shirts(size="large", text="goood")

#Exercice6

magicians_names=['Harry Houdini', 'David Blaine', 'Criss Angel']

def show_magician(magicians_names):
    for magician in magicians_names:
        print(magician)

show_magician(magicians_names)

def make_great(magician_names):
    for magician in magicians_names:
        print(magician + "The great")

make_great(magicians_names)

#Exercice 7

import random

# Step 1 — function that generates a random temperature between -10 and 40
def get_random_temp():
    return random.randint(-10, 40)

# Steps 2 and 3 — main function
def main():
    # Call get_random_temp() and store the result
    temperature = get_random_temp()
    
    # Display the temperature
    print(f"The current temperature is {temperature} degrees Celsius.")
    
    # Step 3 — advice based on the temperature
    if temperature < 0:
        print("Brrr, it's freezing cold! Put on some extra layers today.")
    elif temperature < 16:
        print("It's quite cold! Don't forget your coat.")
    elif temperature < 24:
        print("Nice weather!")
    elif temperature < 32:
        print("It's a bit warm, make sure to stay hydrated.")
    else:
        print("It's really hot! Stay cool and in the shade.")

