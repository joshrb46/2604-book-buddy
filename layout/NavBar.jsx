import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";
import "../styles/navbar.css";

export default function NavBar() {
  const { token, logout } = useAuth();
  return (
    <header>
      <p>Book Buddy</p>
      <nav>
        <NavLink to="/books">Catalog</NavLink>
        {token ? (
          <>
            <NavLink to="/account">My Account</NavLink>
            <a onClick={() => logout()}>Log Out</a>
          </>
        ) : (
          <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}
