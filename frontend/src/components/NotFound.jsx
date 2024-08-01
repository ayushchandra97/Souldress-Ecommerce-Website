import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="flex-body d-flex justify-content-center align-items-center flex-column">
      <h1 className="text-primary">404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button className="btn-theme" as={Link} to="/">Back To Home Page</Button>
    </section>
  )
}
