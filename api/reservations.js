const API = import.meta.env.VITE_API;

export async function reservedBooks(token) {
  const response = await fetch(API + "/reservations", {
    headers: { Authorization: "Bearer " + token },
  });
  const result = await response.json();
  return result;
}

export async function reserveBook(token, bookId) {
  if (!token) {
    throw Error("You must be signed in to reserve a book.");
  }

  const response = await fetch(API + "/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ bookId }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}

export async function deleteReservation(token, reservationId) {
  if (!token) {
    throw Error("You must be signed in to return a book.");
  }

  const response = await fetch(API + "/reservations/" + reservationId, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    const result = await response.json();
    throw Error(result.message);
  }
}
