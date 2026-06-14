import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import "../styles/auth.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryRegister = async (formData) => {
    setError(null);

    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await register({ firstname, lastname, email, password });
      navigate("/account");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      <section className="auth-page">
        <h2>Register for an account</h2>
        <form action={tryRegister}>
          <label>
            First Name
            <input type="text" name="firstname" required />
          </label>
          <label>
            Last Name
            <input type="text" name="lastname" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          <button>Register</button>
          {error && <p role="alert">{error}</p>}
        </form>
        <Link to="/login">Already have an account? Log in here.</Link>
      </section>
    </>
  );
}
