import React from 'react'
import Rating from 'react-rating';
import pop_empty from "../images/pop_blank.png"
import pop_fill from "../images/pop_fill.png"
import { Container, Button, Form } from 'react-bootstrap'

const PostComments = () => {


    return (
        // <div>
        //     <h6> Rate the Movie:</h6>
        //     <Rating
        //         style={{ marginTop: "10px" }}
        //         stop="10" step="2"
        //         emptySymbol={<img src={pop_empty} alt="pop" className="icon" style={{ width: "30px", height: "30px" }} />}
        //         fullSymbol={<img src={pop_fill} alt="pop" className="icon" style={{ width: "30px", height: "30px" }} />}
        //     />
        //     <form>
        //         <p>Add your comments</p>
        //         <textarea name="comment" cols="30" rows="10"></textarea>
        //         <button >Cancel</button>
        //         <button >Save and Post</button>
        //     </form>
        // </div>
        <Container>
            <h5> Rate the Movie:</h5>
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
