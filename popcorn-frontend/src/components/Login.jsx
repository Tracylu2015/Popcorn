import React, {useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Button>Login</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default Login
