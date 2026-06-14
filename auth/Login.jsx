import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";
import "../styles/auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const tryLogin = async (formData) => {
    setError(null);

    const email = formData.get("email");
    const password = formData.get("password");
    try {
      await login({ email, password });
      navigate("/account");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <section className="auth-page">
        <h2>Log in to your account</h2>
        <form action={tryLogin}>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          <button>Log in</button>
          {error && <p role="alert">{error}</p>}
        </form>
        <Link to="/register">Need an account? Register here.</Link>
      </section>
    </>
  );
}
