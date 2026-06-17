# Exercise 1: Hello World

print("Hello world\nHello world\nHello world\nHello world")

# Exercise 2: Some Math
print((99**3)* 8)

#Exercise 3: What is the output */

#5 < 3 #False
#3 == 3 #True
#3 == "3" #False
#"3" > 3 #False
#"Hello" == "hello" #False

# Exercise 4: Your computer brand
computer_brand = "HP"
print(f"I have a {computer_brand} computer")

# Exercise 5: Your Information
name = "Yair"
age = 21
shoe_size = 42
info=(f"My name is {name}, I am {age} years old and my shoe size is {shoe_size}")
print(info)

# Exercise 6: A & B
a = 10
b = 5
if a > b:
    print("Hello World")

# Exercise 7: Odd or Even
number = int(input("Enter a number: "))
if number % 2 == 0:
    print("The number is even.")
else:
    print("The number is odd")

# Exercise 8: What’s your name
name = input("Enter your name: ")
if name == "Yair":
    print("LOL")
elif name== "Alice":
    print("Hello Alice")
else:
    print("Hello stranger")

# Exercise 9: Tall enough to ride a rollercoaster

height = input("Enter your height in cm: ")
if int(height) >= 145:
    print("You are tall enough to ride the rollercoaster!")
else:
    print("Sorry, you need to be at least 145cm tall to ride the rollercoaster.")