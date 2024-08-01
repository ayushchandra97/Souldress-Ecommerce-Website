import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Item from "../components/Item"

export default function AllProducts() {

    const { allProducts } = useContext(ShopContext)

    return (
        <main className="flex-body">
            <Container className="my-4">
                <h1 className="text-center text-primary">All Products</h1>
                <Row>
                    {allProducts.map((product, index) => {
                        return <Col key={index} xs={12} sm={6} md={6} lg={4} xl={3} className="mb-4">
                            <Item id={product.id} name={product.name} old_price={product.old_price} new_price={product.new_price} category={product.category} image={product.image} />
                        </Col>
                    })}

                </Row>
            </Container>
        </main>
    )
}
