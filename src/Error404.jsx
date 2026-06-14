import { Link } from "react-router";
import "../styles/error404.css";

export default function Error404() {
  return (
    <>
      <section className="error-page">
        <h2>404 – Page Not Found</h2>
        <p>That page doesn't exist.</p>
        <Link to="/books">Go to the catalog</Link>
      </section>
    </>
  );
}
