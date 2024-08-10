import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import upload_img from '../assets/upload_area.svg'
import { useState } from 'react'
import { useErrorBoundary } from 'react-error-boundary'

export default function AddProduct() {
    const { showBoundary } = useErrorBoundary()
    const [image, setImage] = useState(false)
    const [productDetails, setProductDetails] = useState({
      name: '',
      image: '',
      category: 'Mens',
      old_price: '',
      new_price: ''
    })

    const [validated, setValidated] = useState(false);

    const validateForm = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
    };
  
    const changeHandler = (e) => {
      setProductDetails({ ...productDetails, [e.target.name]: e.target.value })
    }
  
    const addProduct = async (e) => {
      e.preventDefault()
      let responseData
      let product = productDetails
      let formData = new FormData()
      formData.append('product', image)
  
      await fetch('http://localhost:3000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData
      }).then((resp) => resp.json())
        .then((data) => responseData = data)
        .catch(() => showBoundary(new Error('Something went wrong')))
  
      if (responseData.success) {
        product.image = responseData.image_url
      }
  
      await fetch('http://localhost:3000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      }).then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Product added successfully")
            location.reload()
          }
        })
        .catch(() => showBoundary(new Error('Something went wrong')))
    }

    const handleSubmit = (e) => {
      validateForm(e)
      addProduct(e)
    }
  
    return (
      <>
        <Container className='my-4'>
          <h1 className='text-center text-primary mb-4'>Add Product</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-50 text-center mx-auto">
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Product title</Form.Label>
              <Form.Control required value={productDetails.name} onChange={changeHandler} name="name" type="text" placeholder="Enter product name" />
              <Form.Control.Feedback className="text-start" type="invalid">
              Please choose a valid product name.
            </Form.Control.Feedback>
            </Form.Group>
  
            <Form.Group controlId='formCategory' className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select value={productDetails.category} onChange={changeHandler} name="category" aria-label="Category">
                <option value="Mens">Mens</option>
                <option value="Womens">Womens</option>
                <option value="Kids">Kids</option>
              </Form.Select>
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formPrice1">
              <Form.Label>Price</Form.Label>
              <Form.Control required value={productDetails.old_price} onChange={changeHandler} name="old_price" type="number" />
              <Form.Control.Feedback className="text-start" type="invalid">
              Please enter a price.
            </Form.Control.Feedback>
            </Form.Group>
  
            <Form.Group className="mb-3" controlId="formPrice2">
              <Form.Label>Offer Price</Form.Label>
              <Form.Control required value={productDetails.new_price} onChange={changeHandler} name="new_price" type="number" />
              <Form.Control.Feedback className="text-start" type="invalid">
              Please enter an offer price.
            </Form.Control.Feedback>
            </Form.Group>
  
            <Form.Group controlId="formFile text-start" className="mb-3">
              <Form.Label className='upload-area'>
                <Image src={image ? URL.createObjectURL(image) : upload_img} thumbnail style={{ height: '150px', width: '150px' }} />
              </Form.Label>
              <Form.Control required onChange={(e) => setImage(e.target.files[0])} name="image" type="file" hidden />
              <Form.Control.Feedback className="text-start" type="invalid">
              Please choose a valid file.
            </Form.Control.Feedback>
            </Form.Group>
  
            <Button className='btn-theme' type="submit">
              Add
            </Button>
          </Form>
        </Container>
      </>
    )
}
