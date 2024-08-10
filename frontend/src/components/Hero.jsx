import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/esm/Button"
import Image from "react-bootstrap/Image"
import { Link } from "react-router-dom"

export default function Hero() {
    return (
        <>
            <Container fluid className="px-1 py-0 m-0 d-flex align-items-center justify-content-center bg-hero">
                <Container className="px-sm-2 mx-sm-5 fs-1 text-center text-hero">
                    <div>
                        Get great quality at cheap price. Only on
                        <Image className="bg-hero-logo" src="/assets/inkpx-word-art.png" />
                    </div>
                    <Button as={Link} to="/allproducts" className="fs-5 btn-banner">Full Catalogue</Button>
                </Container>
                <Container className="p-0 m-0 text-center d-inline-block">
                    <Image className="hero-img" src="/assets/hero_image.png" />
                </Container>
            </Container>
        </>
    )
}
