const API = import.meta.env.VITE_API;

export async function getAccount(token) {
  const response = await fetch(API + "/users/me", {
    headers: { Authorization: "Bearer " + token },
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

export async function login(credentials) {
  const response = await fetch(API + "/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}

export async function register(credentials) {
  const response = await fetch(API + "/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  const result = await response.json();
  if (!response.ok) throw Error(result.message);
  return result;
}
