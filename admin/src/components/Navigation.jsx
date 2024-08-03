import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'


// eslint-disable-next-line react/prop-types
export default function Navigation({ loginStatus, setShowAllProducts }) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const toggleOffCanvas = () => setShow((show) => !show)

  const buttonClickHandler = (condition) => {
    toggleOffCanvas()
    setShowAllProducts(condition)
  }

  return (
    <>
      <Navbar expand="false" aria-label="offcanvas navbar" className='bg-nav-footer'>
        <Container className='flex-nowrap justify-content-start gap-4'>
          {loginStatus ? <Navbar.Toggle onClick={handleShow} aria-controls="offcanvasNavbar" /> : <></>}
          <Container className="mx-auto text-center">
            <Navbar.Brand><img className='nav-img' src="/src/assets/inkpx-word-art.png" /></Navbar.Brand>
          </Container>
        </Container>
      </Navbar>

      {loginStatus ? (<Offcanvas show={show} onHide={handleClose} id="offcanvasNavbar">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='d-flex flex-column gap-4'>
          <Button onClick={() => buttonClickHandler(false)} className='btn-theme'>Add Product</Button>
          <Button onClick={() => buttonClickHandler(true)} className='btn-theme'>All Products</Button>
        </Offcanvas.Body>
      </Offcanvas>) : <></> }
    </>
  )
}
