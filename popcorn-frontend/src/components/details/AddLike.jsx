import axios from 'axios'
import React from 'react'
import { Button, Row, Col} from 'react-bootstrap'


const AddLike = ({ comment, onCommentChange }) => {

    const addLike = (e) => {
        let like_status = e.target.value
        console.log(comment)
        let commentId = comment.id
        axios.post(`http://localhost:8080/api/userLike/addLike`, { like_status, commentId })
            .then(res => {
                onCommentChange(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <Row >
            <Col sm={3}style={{ marginTop: "5px" }}>{comment.totalLikes}</Col>
            <Col sm={2}>
                {comment.likeStatus?<Button size="sm" onClick={addLike} value="false">unlike</Button> 
                    : <Button size="sm" onClick={addLike} value="true">like</Button>
                }
            </Col>
        </Row>
    )
}

export default AddLike
