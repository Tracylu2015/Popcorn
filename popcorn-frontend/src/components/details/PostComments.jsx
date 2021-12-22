import React, { useState } from 'react'
import axios from "axios"
import { useHistory } from "react-router-dom"
import { Button, Form } from 'react-bootstrap'
import Modal from 'react-modal'

const PostComments = ({ oneMovie, showModal, setShowModal, onCommentAdded }) => {

    const [post, setPost] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()

    const addNewComment = (e) => {
        let movieId = oneMovie.id
        e.preventDefault()
        if (post === "") {
            setErrors([...errors, "Comment can not be empty"])
            history.push("/movies/post")
        } else {
            axios.post('http://localhost:8080/api/comment/new', { post, movieId })
                .then(res => {
                    onCommentAdded(res.data)
                    setErrors([])
                    setShowModal(false)
                    history.push(`/movies/detail/${movieId}`)
                })
                .catch(err => {
                    if (err.response) {
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

            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label><h6>Add your comments:</h6></Form.Label>
                    <Form.Control as="textarea" rows={5} style={{ width: '500px' }} onChange={e => setPost(e.target.value)} />
                </Form.Group>
                <Button variant="primary" onClick={addNewComment} style={{ marginRight: "10px" }}>Post</Button>
                <Button variant="primary" onClick={() => setShowModal(!showModal)}>Cancel</Button>
            </Form>
        </Modal>
    )
}

export default PostComments
