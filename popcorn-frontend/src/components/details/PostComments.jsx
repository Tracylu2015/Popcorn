import React, {useState} from 'react'
import Rating from 'react-rating';
import axios from "axios"
import pop_empty from "../../images/pop_blank.png"
import pop_fill from "../../images/pop_fill.png"
import { useHistory } from "react-router-dom"
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-modal'

const PostComments = ({oneMovie, showModal,setShowModal}) => {

    const [post, setPost] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()

    const addNewComment = (e) => {
        let movieId = oneMovie.id
        let score = oneMovie.score
        e.preventDefault()
        if(post === ""){
            setErrors([...errors, "Comment can not be empty"])
            history.push("/movies/post")
        }
        else{
            axios.post('http://localhost:8080/api/comment/new',{post, movieId, score})
            .then(res =>{
                setErrors([])
                setShowModal(false)
                history.push('/user/profile')
            })
            .catch(err => {
                if(err.response){
                    setErrors(err.response.data.error)
                }
            })
        }
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Modal style={customStyles} ariaHideApp={false} isOpen={showModal} onRequestClose={() => { setShowModal(!showModal) }} contentLabel="Rate it and Add a comment">
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
                    <Form.Label><h6>Add your comments:</h6></Form.Label>
                    <Form.Control as="textarea" rows={5} style={{ width: '500px' }} onChange={e => setPost(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" style={{ marginRight: "10px" }}>Post</Button>
                <Button variant="primary" onClick={() => setShowModal(!showModal)}>Cancel</Button>
            </Form>
        </Modal>
    )
}

export default PostComments
