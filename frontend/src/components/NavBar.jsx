import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import Image from "react-bootstrap/Image"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import { Link, useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext"

export default function NavBar() {
  const { setIsLoggedIn } = useContext(ShopContext)
  const navigate = useNavigate()

  const removeToken = () => {
    localStorage.removeItem("auth-token")
    setIsLoggedIn(false)
    navigate("/")
  }

  const [link, setLink] = useState("")

  return (
    <Navbar className="bg-nav-footer" expand="lg">
      <Container>
        <Navbar.Brand onClick={() => setLink("")} as={Link} to="/">
          <Image src="/assets/inkpx-word-art.png" style={{ width: "240px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link
              onClick={() => setLink("mens")}
              className={`link-primary link-opacity-75-hover fs-3 fw-semibold ${
                link === "mens" ? "active-link" : ""
              }`}
              as={Link}
              to="/mens"
            >
              Mens
            </Nav.Link>
            <Nav.Link
              onClick={() => setLink("womens")}
              className={`link-primary link-opacity-75-hover fs-3 fw-semibold ${
                link === "womens" ? "active-link" : ""
              }`}
              as={Link}
              to="/womens"
            >
              Womens
            </Nav.Link>
            <Nav.Link
              onClick={() => setLink("kids")}
              className={`link-primary link-opacity-75-hover fs-3 fw-semibold ${
                link === "kids" ? "active-link" : ""
              }`}
              as={Link}
              to="/kids"
            >
              Kids
            </Nav.Link>
          </Nav>
          <div className="d-flex">
            <Row className="d-flex flex-lg-row flex-md-row">
              <Col className="my-lg-0 my-md-2 my-sm-3" xs="auto">
                {localStorage.getItem("auth-token") ? (
                  <Button
                    className="btn btn-theme"
                    onClick={() => removeToken()}
                    type="button"
                  >
                    Logout
                  </Button>
                ) : (
                  <Link className="btn btn-theme" to="/login">
                    Login/ Sign Up
                  </Link>
                )}
              </Col>
              <Col className="my-lg-0 my-md-2 my-sm-3" xs="auto">
                <Button
                  as={Link}
                  to="/cart"
                  className="d-flex btn-theme btn-cart"
                >
                  <Image src="/assets/cart-shopping-solid.svg" />
                  <Container>Cart</Container>
                </Button>
              </Col>
            </Row>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
