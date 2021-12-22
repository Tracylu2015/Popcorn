import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Row, Col, Container, Button } from 'react-bootstrap'
import ExpandableContent from 'react-expandable-content';

const MyPost = () => {

    const [myPost, setMyPost] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/comment/user`)
            .then(res => setMyPost(res.data))
            .catch((error) => console.log(error))
    }, [])

    return (

        <Container>
            <h3 style={{marginTop:"20px"}}>My Post</h3>
            <Row>
                {myPost.map((comment, i) => {
                    return (
                        <Col sm={8} md={"auto"} style={{ marginTop: "20px" }}>
                            <Card>
                                <Card.Header as="h5">
                                    <Row>
                                        <Col>
                                            {comment.movie.primaryTitle}&nbsp;&nbsp;&nbsp;&nbsp;
                                        </Col>
                                        <Col sm={1} md={"auto"} style={{paddingTop:"10px"}}>
                                            {comment.totalLikes}&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Button size="sm" >Delete</Button>
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
