import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Row, Col, Container, Button } from 'react-bootstrap'

const MyPost = () => {

    const [myPost, setMyPost] = useState([])
    // const context = useContext(currentUser)
    // const id = context.currentUser.id

    useEffect(() => {
        axios.get(`http://localhost:8080/api/comment/user`)
            .then(res => setMyPost(res.data))
            .catch((error) => console.log(error))
    }, [])

    return (
        // <Container style={{ marginLeft: "40px", marginTop: "20px" }}>
        //     {<h3>My Post</h3>}
        //     {myPost.map((comment, i) => {
        //         return(
        //             <Card key={i}>
        //             <div>
        //                 <Card.Header as="h5">Movie: {comment.movie.primaryTitle}</Card.Header>
        //                 <p>{comment.created}</p>
        //             </div>
        //             <Card.Body>
        //                 <Card.Title>{comment.totalLikes}</Card.Title>
        //                 <Card.Text>
        //                 {comment.post}
        //                 </Card.Text>
        //             </Card.Body>
        //             </Card>
        //         )
        //     })}
        // </Container>
        <Container>
            <h3>My Post</h3>
            <Row>
                {myPost.map((comment, i) => {
                    return (
                        <Col sm={8} md={"auto"} style={{ marginTop: "20px" }}>
                            <Card>
                                <Card.Header as="h5">
                                    <Row>
                                        <Col>
                                            Movie: {comment.movie.primaryTitle}&nbsp;&nbsp;&nbsp;&nbsp;
                                        </Col>
                                        <Col sm={1} md={"auto"}>
                                            <Button size="sm" >Delete</Button>
                                        </Col>
                                    </Row>
                                    <p style={{fontSize: 14}}>{comment.created}</p>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        {comment.post}
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
