import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getBooks } from "../api/books";
import "../styles/books.css";

export default function BooksPage() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const syncBooks = async () => {
      const data = await getBooks();
      setBooks(data);
    };
    syncBooks();
  }, []);

  if (!books) return <p>Loading...</p>;

  return (
    <article className="books-page">
      <h1>Book Catalog</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="book-card">
            <Link to={`/books/${book.id}`}>
              {book.coverimage && (
                <img
                  src={book.coverimage}
                  alt={book.title}
                  className="book-card-cover"
                />
              )}
              <strong>{book.title}</strong> by {book.author}
            </Link>
            <span className={`book-tag ${book.available ? "" : "unavailable"}`}>
              {book.available ? "Available" : "Unavailable"}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
