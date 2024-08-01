import { useParams } from "react-router-dom"
import Container from "react-bootstrap/esm/Container"
import ProductDisplay from "../components/ProductDisplay"
import { useContext } from "react"
import { ShopContext } from "../context/ShopContext"

export default function Product() {

  const { allProducts, productsLoaded } = useContext(ShopContext)

  const { productId } = useParams()

  const product = allProducts.find((e) => e.id === Number(productId))

  // console.log(product)

  return (
    <>
      <Container className="flex-body">
        {productsLoaded && product ? (
          <ProductDisplay product={product} />

        ) : (
          <p>Loading...</p>
        )}
      </Container>
    </>
  )
}
