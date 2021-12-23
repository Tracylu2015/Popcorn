import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Row, Col, Container, Button } from 'react-bootstrap'
import ExpandableContent from 'react-expandable-content';

const MyPost = () => {

    const [myPost, setMyPost] = useState([])
    const [commentId, setCommentId] = useState('')
    

    useEffect(() => {
        axios.get(`http://localhost:8080/api/comment/user`)
            .then(res => setMyPost(res.data))
            .catch((error) => console.log(error))
    }, [])

    const deleteComment = (e) => {
        let commentId = e.target.value;
        console.log(commentId);
        axios.get(`http://localhost:8080/api/comment/delete/${commentId}`)
            .then(res => setMyPost(res.data))
            .catch(error => console.log(error))
    }
    

    return (

        <Container style = {{height:"100vh"}} > 
            <h3 style={{marginTop:"20px"}}>My Post</h3>
            <Row>
                {myPost.map((comment, i) => {
                    return (
                        <Col sm={12} style={{ marginTop: "20px" }}>
                            <Card>
                                <Card.Header as="h5">
                                    <Row>
                                        <Col>
                                            {comment.movie.primaryTitle}&nbsp;&nbsp;&nbsp;&nbsp;
                                        </Col>
                                        <Col sm={1} md={"auto"} style={{paddingTop:"10px"}}>
                                            {comment.totalLikes}&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Button size="sm" value={comment.id} onClick={deleteComment}>Delete</Button>
                                        </Col>
                                    </Row>
                                    <p style={{fontSize: 14}}>{comment.created}</p>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        <ExpandableContent maxHeight={100} collapseText={"Read less"} expandText={"Read more"}>
                                            {comment.post}
                                        </ExpandableContent>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>

    )
}

export default MyPost
