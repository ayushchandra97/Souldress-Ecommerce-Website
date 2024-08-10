import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Container from "react-bootstrap/Container"
import Item from "../components/Item"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import PropTypes from "prop-types"
import banner_kids from "/assets/banner_kids.png"
import banner_mens from "/assets/banner_mens.png"
import banner_women from "/assets/banner_women.png"

ShopCategory.propTypes = {
    category: PropTypes.string
}

export default function ShopCategory(props) {

    const { allProducts } = useContext(ShopContext)

    return (
        <main className="mt-4 flex-body">
            <Image className="banner-category" src={props.category === "Mens" ? banner_mens : props.category === "Womens" ? banner_women : banner_kids}></Image>
            <Container className="my-4">
                <h1 className="text-center text-primary">{props.category} Clothing</h1>
                <Row>
                    {allProducts.map((product, index) => {
                        if (props.category === product.category) {
                            return (
                                <Col sm={12} md={6} lg={4} xl={3} key={index}>
                                    <Item id={product.id} name={product.name} old_price={product.old_price} new_price={product.new_price} image={product.image} />
                                </Col>
                            )
                        } else {
                            return null
                        }
                    })}
                </Row>
            </Container>
        </main>

    )
}
