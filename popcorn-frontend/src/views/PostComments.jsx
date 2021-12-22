import React, {useState} from 'react'
import Rating from 'react-rating';
import axios from "axios"
import pop_empty from "../images/pop_blank.png"
import pop_fill from "../images/pop_fill.png"
import { useHistory } from "react-router-dom"
import { Container, Button, Form } from 'react-bootstrap'

const PostComments = () => {

    const [post, setPost] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()

    const addNewComment = (e) => {
        e.preventDefault()
        if(post === ""){
            setErrors([...errors, "Comment can not be empty"])
            history.push("/movies/post")
        }
        else{
            axios.post('http://localhost:8080/api/comment/new',{post})
            .then(res =>{
                setErrors([])
                history.push('/user/profile')
            })
            .catch(err => {
                if(err.response){
                    setErrors(err.response.data.error)
                }
            })
        }
    }

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
            <Form onSubmit={addNewComment}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Add your comments:</Form.Label>
                    <Form.Control as="textarea" rows={5} style={{ width: '500px' }} onChange={e => setPost(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" style={{ marginRight: "10px" }}>Post</Button>
                <Button variant="primary">Cancel</Button>
            </Form>
        </Container>
    )
}

export default PostComments
