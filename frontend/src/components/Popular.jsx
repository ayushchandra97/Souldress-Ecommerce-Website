import Container from "react-bootstrap/Container"
import PropTypes from "prop-types"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Item from "./Item"
import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"


Popular.propTypes = {
    category: PropTypes.string
}

export default function Popular(props) {

    const { allProducts } = useContext(ShopContext)
    let count = 0

    return (
        <>
            <Container className="my-4">
                <h1 className="text-center text-primary">Popular in {props.category}</h1>
                <Row>
                    {allProducts.map((product, index) => {
                        if (props.category === product.category && count < 4) {
                            count += 1
                            return <Col key={index} xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4">
                                <Item id={product.id} name={product.name} old_price={product.old_price} new_price={product.new_price}  image={product.image} />
                            </Col>
                        } else {
                            return null
                        }
                    })}

                </Row>
            </Container>
        </>
    )
}
