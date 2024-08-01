import Container from "react-bootstrap/Container"
import Popular from "../components/Popular"
import Hero from "../components/Hero"

export default function Home() {


  return (
    <>
      <Container fluid className="p-0 mt-4 flex-body">
        <Hero />
        <Popular category="Mens" />
        <Popular category="Womens" />
        <Popular category="Kids" />
      </Container>
    </>
  )
}
