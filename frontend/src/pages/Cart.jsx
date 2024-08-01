import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'

export default function Cart() {

  const { cartItems, removeFromCart, addToCart } = useContext(ShopContext)
  let total = 0

  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].total_price
  }

  return (
    <main className='flex-body'>
      <h1 className="mt-4 text-center text-primary">Cart</h1>
      <Container className="my-5">
        {cartItems.map((item, index) => {
          return (
            <Container fluid className="border-bottom border-light-subtle bg-body-tertiary" key={index}>
              <Row className="p-2">
                <Col fluid lg={3} md={3} sm={4} xs={4} className="d-flex align-items-center">
                  <Image className="cart-product-image" src={item.image} rounded />
                </Col>
                <Col fluid lg={9} md={9} sm={8} xs={8}>
                  <Row fluid className='h-100 d-flex align-items-center'>
                    <Col fluid lg={4} md={4} sm={12} xs={12} className="d-flex flex-column justify-content-center">
                      <p className='mb-1 fs-4'>{item.name}</p>
                      <p className='mb-1 text-secondary'>{item.category}</p>
                    </Col>
                    <Col className='d-flex flex-column justify-content-center' fluid lg={4} md={4} sm={12} xs={12}>
                      <p className='fs-6'>Price: <span className='text-primary'>₹{item.price}</span></p>
                      <p className='fs-5 text-nowrap'>Total price: <span className='text-primary'>₹{item.total_price}</span></p>
                    </Col>
                    <Col fluid lg={3} md={3} sm={8} xs={9} className="d-flex">
                      <Container fluid className='d-flex cart-btns-container'>
                        <Button onClick={() => addToCart(item.productId, -1)} className=' cart-quantity-btn' type="button">
                          <Image src="/src/assets/minus.svg" />
                        </Button>
                        <Form.Control className='text-center  input-control' type="text" value={item.quantity} disabled />
                        <Button onClick={() => addToCart(item.productId, 1)} className=' cart-quantity-btn' type="button">
                          <Image src="/src/assets/plus.svg" />
                        </Button>
                      </Container>
                    </Col>
                    <Col fluid lg={1} md={1} sm={4} xs={3}>
                      <Button className='cross-btn' onClick={() => removeFromCart(item.productId)} to="#"><Image src="/src/assets/cart_cross_icon.png" /></Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          )
        })}
      </Container>
      <Container className='text-center bg-secondary-subtle'>
        <p><span className='fs-2'>Total amount: </span><span className='fs-1 text-primary'>₹{total}</span></p>
      </Container>
      <Container className='text-center mb-5'>
        <Button onClick={() => total === 0 ? null : alert("Purchase successful")} variant='primary' className='btn-theme fs-4'>Purchase</Button>
      </Container>
    </main>
  )
}
