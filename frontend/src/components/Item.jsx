import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Image from "react-bootstrap/Image"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"

Item.propTypes = {
  id: PropTypes.number,
  image: PropTypes.any,
  name: PropTypes.string,
  new_price: PropTypes.number,
  old_price: PropTypes.number,
  category: PropTypes.string
}

export default function Item(props) {

  const { addToCart } = useContext(ShopContext)

  return (

    <Card className="item-card mx-auto">
      <Link className="mx-auto mt-4" to={`/product/${props.id}`}><Card.Img variant="top" src={props.image} /></Link>
      <Card.Body>
        <Card.Title className="mb-4 d-flex justify-content-center">{props.name}</Card.Title>
        {props.category ? <Card.Text className="mb-2 d-flex justify-content-center">{props.category}</Card.Text> : <></>}
        <Card.Text className="mb-3 d-flex justify-content-center">
          <Image src="src/assets/star-fill.svg" />
          <Image src="src/assets/star-fill.svg" />
          <Image src="src/assets/star-fill.svg" />
          <Image src="src/assets/star-fill.svg" />
          <Image src="src/assets/star-half.svg" />
        </Card.Text>
        <Card.Text className="mb-2 d-flex justify-content-center"><s>₹{props.old_price}</s></Card.Text>
        <Card.Text className="mb-2 d-flex justify-content-center fs-4">₹{props.new_price}</Card.Text>
        <Button className="d-block px-4 mx-auto btn-theme" onClick={() => addToCart(props.id, 1)} variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
  )
}
