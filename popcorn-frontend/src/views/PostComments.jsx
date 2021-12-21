import React from 'react'
import Rating from 'react-rating';
import pop_empty from "../images/pop_blank.png"
import pop_fill from "../images/pop_fill.png"
import { Container, Button, Form } from 'react-bootstrap'

const PostComments = () => {
    return (
        <Container>
            <h5> Rate the Movie:</h5>
            {/* <MyRating oneMovie={oneMovie} onChange={onStatusChanged} readonly={"true"} /> */}
            <Rating
                style={{ marginTop: "10px" }}
                stop="10" step="2"
                emptySymbol={<img src={pop_empty} alt="pop" className="icon" style={{ width: "30px", height: "30px" }} />}
                fullSymbol={<img src={pop_fill} alt="pop" className="icon" style={{ width: "30px", height: "30px" }} />}
            />
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Add your comments:</Form.Label>
                    <Form.Control as="textarea" rows={5} style={{ width: '500px' }}/>
                </Form.Group>
                <Button variant="primary" style={{ marginRight: "10px" }}>Post</Button>
                <Button variant="primary">Cancel</Button>
            </Form>
        </Container>
    )
}

export default PostComments
