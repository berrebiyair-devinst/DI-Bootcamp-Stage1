import { useSelector } from "react-redux";
import { selectBooks } from "../features/books/booksSelectors";
import {useState} from "react";
function BookList() {
  
 const [filter, setFilter] = useState("All");

const books = useSelector(selectBooks);

const filteredBooks = books.filter((book) => {
  return filter === "All" || book.genre === filter;
});

  return (
    <div>
      <h2>Book Inventory</h2>

      <select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
>
  <option value="All">All</option>
  <option value="Horror">Horror</option>
  <option value="Fantasy">Fantasy</option>
  <option value="Science Fiction">Science Fiction</option>
</select>
        <ul>
            {filteredBooks.map((book) => (
              <li key={book.id}>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.genre}</p>
              </li>
            ))}
            
        </ul>
    </div>
  );
}

export default BookList;