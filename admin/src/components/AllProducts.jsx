import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useErrorBoundary } from 'react-error-boundary'

// eslint-disable-next-line react/prop-types
export default function AllProducts() {

  const { showBoundary } = useErrorBoundary()

  const [allProducts, setAllProducts] = useState([])

  const fetchInfo = async () => {
    fetch('http://localhost:3000/allproducts')
      .then((res) => res.json())
      .then((data) => setAllProducts(data))
      .catch(() => showBoundary(new Error('Something went wrong')))
  }

  useEffect(() => {
      fetchInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeProduct = async(id) => {
    fetch('http://localhost:3000/removeproduct', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
    .then((res) => res.json())
    .then((data) => {
      data.success?alert('Product removed'):alert('Failed to remove product')
    })
    .catch(() => showBoundary(new Error('Something went wrong')))
    await fetchInfo()
  }

  return (
    <>
      <Container className='my-4'>
        <h1 className='text-center text-primary mb-4'>All Products</h1>
        {allProducts.map((product, index) => {
          return <Container fluid className="border-bottom border-light-subtle bg-body-tertiary" key={index}>
              <Row className="p-2">
                <Col lg={3} md={3} sm={5} xs={5} className="d-flex align-items-center">
                  <Image className="cart-product-image" src={product.image} rounded />
                </Col>
                <Col lg={9} md={9} sm={7} xs={7}>
                  <Row className='d-flex align-items-center'>
                    <Col lg={4} md={4} sm={12} xs={12} className="d-flex flex-column justify-content-center">
                      <p className='mb-1 fs-4'>{product.name}</p>
                      <p className='mb-1 text-secondary'>{product.category}</p>
                    </Col>
                    <Col lg={7} md={7} sm={12} xs={12} className='d-flex flex-column justify-content-center'>
                      <p className='fs-6'>Old Price: <s className='text-primary'>₹{product.old_price}</s></p>
                      <p className='fs-5 text-nowrap'>Offer price: <span className='text-primary'>₹{product.new_price}</span></p>
                    </Col>
                    <Col lg={1} md={1} sm={12} xs={12}>
                      <Button className='cross-btn' onClick={() => removeProduct(product.id)}><Image src="/assets/cart_cross_icon.png" /></Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
        })}
      </Container>
    </>
  )
}
