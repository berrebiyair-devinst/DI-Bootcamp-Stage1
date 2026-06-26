import random

# Word list
words = ["python", "programming", "computer", "keyboard", "algorithm",
         "variable", "function", "loop", "list", "dictionary"]

def display_hangman(errors):
    stages = [
        """
         -----
         |   |
             |
             |
             |
             |
        =========""",
        """
         -----
         |   |
         O   |
             |
             |
             |
        =========""",
        """
         -----
         |   |
         O   |
         |   |
             |
             |
        =========""",
        """
         -----
         |   |
         O   |
        /|   |
             |
             |
        =========""",
        """
         -----
         |   |
         O   |
        /|\  |
             |
             |
        =========""",
        """
         -----
         |   |
         O   |
        /|\  |
        /    |
             |
        =========""",
        """
         -----
         |   |
         O   |
        /|\  |
        / \  |
             |
        ========="""
    ]
    print(stages[errors])

def play():
    # Choose a random word
    word = random.choice(words)

    # Create the list with stars
    displayed_word = ['*'] * len(word)

    # Already guessed letters
    guessed_letters = set()

    errors = 0
    max_errors = 6

    print("=== HANGMAN GAME ===")
    print(f"The word has {len(word)} letters\n")

    while errors < max_errors:
        display_hangman(errors)
        print("Word : ", ' '.join(displayed_word))
        print(f"Guessed letters : {', '.join(sorted(guessed_letters))}")
        print(f"Errors : {errors}/{max_errors}\n")

        # Check if word is found
        if '*' not in displayed_word:
            print(f"Well done! You found the word : {word}")
            break

        # Ask for a letter
        letter = input("Guess a letter : ").lower()

        # Check if already guessed
        if letter in guessed_letters:
            print(" You already guessed that letter!")
            continue

        # Add to guessed letters
        guessed_letters.add(letter)

        # Check if letter is in the word
        if letter in word:
            print("Good letter!")
            for i in range(len(word)):
                if word[i] == letter:
                    displayed_word[i] = letter
        else:
            print("Wrong letter!")
            errors += 1

    # End of game
    if errors == max_errors:
        display_hangman(errors)
        print(f"Game over! The word was : {word}")

# Launch the game
play()