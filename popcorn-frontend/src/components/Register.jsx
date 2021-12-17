import React, {useState} from 'react';
import {Form, Button, Card} from 'react-bootstrap'



const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")



    return (
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Name: </Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email: </Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password: </Form.Label>
                        <Form.Control type="password" />
                    </Form.Group>
                    <Button>Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}

export default Register

