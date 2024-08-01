import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Image from "react-bootstrap/Image"
import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"

export default function Footer() {
    return (
        <>
            <Container fluid className="bg-nav-footer">
                <Container>
                    <Row className="d-flex align-items-center">
                        <Col lg={9} md={8} sm={8} xs={6}>
                            <Link to="/"><Image className="footer-logo" src="/src/assets/inkpx-word-art.png"></Image></Link>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={6} className="d-flex">
                            <Link className="mx-3" to="https://whatsapp.com" target="_blank"><Image className="footer-social" src="/src/assets/whatsapp_icon.png" ></Image></Link>
                            <Link className="mx-3" to="https://instagram.com" target="_blank"><Image className="footer-social" src="/src/assets/instagram_icon.png" ></Image></Link>
                            <Link className="mx-3" to="https://pinterest.com" target="_blank"><Image className="footer-social" src="/src/assets/pintester_icon.png" ></Image></Link>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}
