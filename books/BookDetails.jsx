import { useEffect, useState } from "react";
import { reserveBook } from "../api/reservations";
import { useParams } from "react-router";
import { getBook } from "../api/books";
import { useAuth } from "../auth/AuthContext";
import "../styles/bookDetails.css";

export default function BookDetails() {
  const { token } = useAuth();
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const syncBook = async () => {
      const data = await getBook(id);
      setBook(data);
    };
    syncBook();
  }, [id]);

  const tryReserve = async () => {
    setError(null);

    try {
      await reserveBook(token, id);
      setBook({ ...book, available: false });
    } catch (e) {
      setError(e.message);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <article className="book-details">
      {book.coverimage && <img src={book.coverimage} alt={book.title} />}
      <section className="book-details-info">
        <h1>{book.title}</h1>
        <p className="by-line">by {book.author}</p>
        {book.description && <p className="description">{book.description}</p>}
        {token && (
          <button
            className="btn btn-primary"
            onClick={tryReserve}
            disabled={!book.available}
          >
            {book.available ? "Reserve This Book" : "Already Reserved"}
          </button>
        )}
        {error && <p role="alert">{error}</p>}
      </section>
    </article>
  );
}
