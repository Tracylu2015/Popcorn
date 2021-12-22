import axios from 'axios'
import React from 'react'
import likeIt from '../../images/likeIt.png'
import likeFilled from '../../images/like_filled.png'
import { Row, Col } from 'react-bootstrap'

const AddLike = ({ comment, onCommentChange }) => {

    const addLike = (e) => {
        let like_status = e.target.value
        let commentId = comment.id
        axios.post(`http://localhost:8080/api/userLike/addLike`, { like_status, commentId })
            .then(res => {
                onCommentChange(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <Row >
            <Col sm={3} style={{marginTop:"4px"}}>{comment.totalLikes}</Col>
            <Col sm={2}>
                {comment.likeStatus
                    ?
                    <input type="image" onClick={addLike} value="false" src={likeFilled} alt="unLike" style={{width:"30px",height:"30px"}}/>
                    : 
                    <input type="image" onClick={addLike} value="true" src={likeIt} alt="unLike" style={{width:"30px",height:"30px"}}/>
                }
            </Col>
        </Row>
    )
}

export default AddLike
