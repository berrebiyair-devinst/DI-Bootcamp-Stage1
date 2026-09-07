interface Book {
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    genre?: string;
}

class Library {
    protected books: Book[] = [];

    public addBook(newBook: Book): void {
        this.books.push(newBook);
    }

    public getBookDetails(isbn: string): string {
        const book = this.books.find(book => book.isbn === isbn);

        if (book) {
            return `${book.title} by ${book.author}, published in ${book.publishedYear}`;
        }

        return "Book not found";
    }
}

class DigitalLibrary extends Library {
    readonly website: string;

    constructor(website: string) {
        super();
        this.website = website;
    }

    public listBooks(): string {
        return this.books.map(book => book.title).join(", ");
    }
}

const digitalLibrary = new DigitalLibrary("www.mylibrary.com");

digitalLibrary.addBook({
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "12345",
    publishedYear: 1925,
    genre: "Novel"
});

digitalLibrary.addBook({
    title: "1984",
    author: "George Orwell",
    isbn: "67890",
    publishedYear: 1949
});

console.log(digitalLibrary.getBookDetails("12345"));
console.log(digitalLibrary.listBooks());