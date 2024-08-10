import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Image from "react-bootstrap/Image"
import Col from "react-bootstrap/Col"

export default function Footer() {
    return (
        <>
            <Container fluid className="bg-nav-footer">
                <Container>
                    <Row className="d-flex align-items-center">
                        <Col lg={9} md={8} sm={8} xs={6}>
                            <Image className="footer-logo" src="/assets/inkpx-word-art.png"></Image>
                        </Col>
                        <Col lg={3} md={4} sm={4} xs={6} className="d-flex">
                            <a className="mx-3" href="https://whatsapp.com" target="_blank"><Image className="footer-social" src="/assets/whatsapp_icon.png" ></Image></a>
                            <a className="mx-3" href="https://instagram.com" target="_blank"><Image className="footer-social" src="/assets/instagram_icon.png" ></Image></a>
                            <a className="mx-3" href="https://pinterest.com" target="_blank"><Image className="footer-social" src="/assets/pintester_icon.png" ></Image></a>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </>
    )
}
