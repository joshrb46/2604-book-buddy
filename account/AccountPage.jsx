import { useEffect, useState } from "react";
import { getAccount } from "../api/users";
import { deleteReservation, reservedBooks } from "../api/reservations";
import { Link } from "react-router";
import { useAuth } from "../auth/AuthContext";
import "../styles/account.css";

export default function AccountPage() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const syncAccount = async () => {
      const userData = await getAccount(token);

      const resData = await reservedBooks(token);
      console.log("reservations:", resData);
      setUser(userData.data?.user ?? userData);
      setReservations(resData.reservations ?? resData ?? []);
    };
    syncAccount();
  }, [token]);

  const tryReturn = async (reservationId) => {
    setError(null);

    try {
      await deleteReservation(token, reservationId);
      setReservations(
        reservations.filter((reservation) => reservation.id !== reservationId),
      );
    } catch (e) {
      setError(e.message);
    }
  };

  if (!token) {
    return (
      <p>
        Please <Link to="/login">log in</Link> or{" "}
        <Link to="/register">register</Link> to view your account.
      </p>
    );
  }

  if (!user || !reservations) return <p>Loading...</p>;

  return (
    <article className="account-page">
      <h1>My Account</h1>
      <section className="account-info">
        <p>
          {user.firstname} {user.lastname}
        </p>
        <p>{user.email}</p>
      </section>
      {error && <p role="alert">{error}</p>}
      <h2>My Reservations</h2>
      {reservations.length === 0 ? (
        <p>You have no reservations.</p>
      ) : (
        <ul className="reservation-list">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="reservation-item">
              <span>{reservation.title ?? `Book #${reservation.bookId}`}</span>
              <button
                className="btn bt-danger"
                onClick={() => tryReturn(reservation.id)}
              >
                Return
              </button>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
