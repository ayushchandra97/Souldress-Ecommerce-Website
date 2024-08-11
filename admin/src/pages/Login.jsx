import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import { useState } from "react"
import { useErrorBoundary } from "react-error-boundary"


// eslint-disable-next-line react/prop-types
export default function Login( { setLoginStatus } ) {

    const { showBoundary } = useErrorBoundary()

    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        adminName: '',
        password: ''
    })

    function changeHandler(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
      }

    async function login() {
        try {
            let responseData
            const res = await fetch('https://souldress-ecommerce-website.vercel.app//adminlogin', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            responseData = data
            if (responseData.success) {
                localStorage.setItem("admin-auth-token", responseData.token)
                setLoginStatus(true)
                
            } else {
                throw new Error(`Error ${responseData.status} - ${responseData.error}`)
            }
        } catch (error) {
            showBoundary(error)
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation()
        }
        setValidated(true);
        login()
    }

    return (
        <section className="flex-body">
            <Container>
                <Container className="my-4 flex-body">
                    <h1 className="mb-3 text-center text-primary">Admin Login</h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit} className="w-50 text-center mx-auto">
                        <Form.Group as={Row} className="mb-3" controlId="formName">
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control required name="adminName" value={formData.adminName} onChange={changeHandler} type="text" placeholder="John Doe" />
                                <Form.Control.Feedback className="text-start" type="invalid">
                                    Please choose a valid name.
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

                        <Button className="btn-theme" type="submit" variant="primary">Continue</Button>
                    </Form>
                </Container>
            </Container>
        </section>
    )
}
