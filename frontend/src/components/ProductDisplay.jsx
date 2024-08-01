import PropTypes from "prop-types"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Image from "react-bootstrap/Image"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import { Link } from "react-router-dom"

ProductDisplay.propTypes = {
  product: PropTypes.any
}

export default function ProductDisplay({ product }) {

  const { addToCart } = useContext(ShopContext)

  return (
    <>
      <Container fluid className="d-flex mt-5 flex-lg-row flex-column">
        <Container className="d-flex product-display">
          <Container className="my-3 w-auto d-flex">
            <Row className="d-flex m-0 p-0 flex-column product-display-col">
              <Col>
                <Image src={product.image} rounded className=" product-display-thumbnail" />
              </Col>
              <Col>
                <Image src={product.image} rounded className=" product-display-thumbnail" />
              </Col>
              <Col>
                <Image src={product.image} rounded className=" product-display-thumbnail" />
              </Col>
              <Col>
                <Image src={product.image} rounded className=" product-display-thumbnail" />
              </Col>
            </Row>
          </Container>
          <Container>
            <Image src={product.image} className="img-main" />
          </Container>
        </Container>

        <Container>
          <h4>{product.name}</h4>
          <Container className="p-0 ms-0 mb-4 ">
            <Image src="/src/assets/star-fill.svg" />
            <Image src="/src/assets/star-fill.svg" />
            <Image src="/src/assets/star-fill.svg" />
            <Image src="/src/assets/star-half.svg" />
            <Image src="/src/assets/star.svg" />
          </Container>
          <p className="fs-5">{product.category}</p>
          <p className="fs-6"><s>₹{product.old_price}</s></p>
          <p className="fs-4">₹{product.new_price}</p>
          <Container className="mx-0 px-0 d-flex">
            <Button className="me-3 d-flex align-items-center btn-theme btn-cart" onClick={() => addToCart(product.id, 1)} variant="primary">
              <Image src="/src/assets/cart-plus-solid.svg" />
              <Container>Add To Cart</Container>
            </Button>
            <Button as={Link} to={localStorage.getItem("auth-token") ? "/cart" : "#"} onClick={() => addToCart(product.id, 1)} className="btn-theme">Buy Now</Button>
          </Container>
          <Container className="mx-0 px-0">
            <h4 className="mt-4">Description</h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur fugit sed ex vel pariatur modi vero fuga earum libero mollitia quidem voluptatibus sunt, nisi, minima eos. Placeat neque qui fuga.
            Ab voluptate ad unde non voluptas eveniet quas tempora, officia necessitatibus deleniti saepe laborum perspiciatis.
          </Container>
        </Container>

      </Container>

      <Container className="my-5">
        <h4>Reviews</h4>
        <Container className="my-4 mx-0 p-0">
          <h5 className="mb-1">Amazing quality</h5>
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star-fill.svg" />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque, provident amet. Perspiciatis libero aliquam earum inventore? Reiciendis, tempore a nobis, commodi voluptatem incidunt debitis assumenda voluptas ab fugiat id ex?
            Amet aliquid odio molestias harum iste nulla ea recusandae sit. Eius, quibusdam ipsam excepturi hic labore placeat quo mollitia, sequi tempora illo tenetur perspiciatis, iste vel ratione quae sint nesciunt.</p>
        </Container>
        <Container className="mx-0 p-0">
          <h5 className="mb-1">Too expensive</h5>
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star-half.svg" />
          <Image src="/src/assets/star.svg" />
          <Image src="/src/assets/star.svg" />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque, provident amet. Perspiciatis libero aliquam earum inventore? Reiciendis, tempore a nobis, commodi voluptatem incidunt debitis assumenda voluptas ab fugiat id ex?
            Amet aliquid odio molestias harum iste nulla ea recusandae sit. Eius, quibusdam ipsam excepturi hic labore placeat quo mollitia, sequi tempora illo tenetur perspiciatis, iste vel ratione quae sint nesciunt.</p>
        </Container>
        <Container className="mx-0 p-0">
          <h5 className="mb-1">Great!</h5>
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star.svg" />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque, provident amet. Perspiciatis libero aliquam earum inventore? Reiciendis, tempore a nobis, commodi voluptatem incidunt debitis assumenda voluptas ab fugiat id ex?
            Amet aliquid odio molestias harum iste nulla ea recusandae sit. Eius, quibusdam ipsam excepturi hic labore placeat quo mollitia, sequi tempora illo tenetur perspiciatis, iste vel ratione quae sint nesciunt.</p>
        </Container>
        <Container className="mx-0 p-0">
          <h5 className="mb-1">Good but size issues</h5>
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star-half.svg" />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque, provident amet. Perspiciatis libero aliquam earum inventore? Reiciendis, tempore a nobis, commodi voluptatem incidunt debitis assumenda voluptas ab fugiat id ex?
            Amet aliquid odio molestias harum iste nulla ea recusandae sit. Eius, quibusdam ipsam excepturi hic labore placeat quo mollitia, sequi tempora illo tenetur perspiciatis, iste vel ratione quae sint nesciunt.</p>
        </Container>
        <Container className="mx-0 p-0">
          <h5 className="mb-1">Trash!</h5>
          <Image src="/src/assets/star-fill.svg" />
          <Image src="/src/assets/star.svg" />
          <Image src="/src/assets/star.svg" />
          <Image src="/src/assets/star.svg" />
          <Image src="/src/assets/star.svg" />
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque, provident amet. Perspiciatis libero aliquam earum inventore? Reiciendis, tempore a nobis, commodi voluptatem incidunt debitis assumenda voluptas ab fugiat id ex?
            Amet aliquid odio molestias harum iste nulla ea recusandae sit. Eius, quibusdam ipsam excepturi hic labore placeat quo mollitia, sequi tempora illo tenetur perspiciatis, iste vel ratione quae sint nesciunt.</p>
        </Container>
      </Container>
    </>
  )
}
