import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import { useContext, useState } from "react"
import { ShopContext } from "../context/ShopContext"

export default function LoginSignUp() {

  const { state, setState, formData, changeHandler, login, signup } = useContext(ShopContext)

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation()
    } else {
      if (state === 'Login') {
        login()
      } else {
        signup()
      }
    }

    setValidated(true);
  };

  return (
    <>
      <Container className="my-4 flex-body">
        <h1 className="mb-3 text-center text-primary">{state}</h1>
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-50 text-center mx-auto">
          {state === 'Sign Up' ? <Form.Group as={Row} className="mb-3" controlId="formName">
            <Form.Label column sm="2">
              Username
            </Form.Label>
            <Col sm="10">
              <Form.Control required name="name" value={formData.name} onChange={changeHandler} type="text" placeholder="John Doe" />
              <Form.Control.Feedback className="text-start" type="invalid">
                Please choose a valid username.
              </Form.Control.Feedback>
            </Col>
          </Form.Group> : <></>}

          <Form.Group as={Row} className="mb-3" controlId="formEmail">
            <Form.Label column sm="2">
              Email
            </Form.Label>
            <Col sm="10">
              <Form.Control required name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="email@example.com" />
              <Form.Control.Feedback className="text-start" type="invalid">
                Please choose a valid e-mail.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formPassword">
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="10">
              <Form.Control required name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
              <Form.Control.Feedback className="text-start" type="invalid">
                Please choose a valid password.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>
          {state === 'Sign Up' ? <p>Already have an account? <span role="button" className="link-primary link-primary-opacity-75-hover" onClick={() => setState('Login')}>Login</span></p>
            : <p>Don&apos;t have an account? <span role="button" className="link-primary link-primary-opacity-75-hover" onClick={() => setState('Sign Up')}>Sign Up</span></p>}

          <Button className="btn-theme" type="submit" variant="primary">Continue</Button>
        </Form>
      </Container>
    </>
  )
}
