import { useState } from "react";
import List from "./List";

interface Book {
  id: number;
  title: string;
  author: string;
}

const BookApp = () => {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
    { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien" }
  ]);

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const addBook = () => {
    if (!title.trim() || !author.trim()) return;

    const newBook: Book = {
      id: Math.max(0, ...books.map(book => book.id)) + 1,
      title: title,
      author: author
    };

    setBooks([...books, newBook]);
    setTitle("");
    setAuthor("");
  };

  return (
    <div>
      <h1>Book List</h1>

      <input
        type="text"
        placeholder="Book title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <button onClick={addBook}>Add Book</button>

      <List<Book>
        items={books}
        renderItem={(book) => (
          <div>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
          </div>
        )}
      />
    </div>
  );
};

export default BookApp;