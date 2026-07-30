# Challenge 1

number = int(input("Your number: "))
length = int(input("Your length: "))

result_list = []

for i in range(1, length + 1):
    result_list.append(i * number)

print(result_list)


# Challenge 2

word = input("Enter a word: ")

result = ""

for i in range(len(word)):
    if i == 0:
        result += word[i]
    elif word[i] != word[i - 1]:
        result += word[i]

print(result)
