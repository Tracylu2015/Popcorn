import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SortComment from '../browse/SortComment'
import { Card, Container, Row, Col } from 'react-bootstrap'

const Comments = () => {

    const { id } = useParams()
    const [comments, setcomments] = useState([])
    const [sort, setSort] = useState("totalLikes")

    useEffect(() => {
        axios.get(`http://localhost:8080/api/comment/movie/${id}?sort=${sort}`)
            .then(res => setcomments(res.data))
            .catch((error) => console.log(error))
    }, [])


    return (
        // <>

        //     <div>
        //         <SortComment sort={sort} setSort={setSort} />
        //     </div>

        //     {comments.map((comment, i) => {
        //         return(
        //             <Card key={i}>
        //             <div>
        //                 <Card.Header as="h5">{comment.user.username}</Card.Header>
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

        <Container>
            <Row>
                <SortComment sort={sort} setSort={setSort} />
            </Row>
            <Row>
                {comments.map((comment, i) => {
                    return (
                        <Col>
                            <Card>
                                <Card.Header as="h5">{comment.user.username}</Card.Header>
                                <Card.Text>{comment.created}</Card.Text>
                                <Card.Body>
                                    <Card.Title>{comment.totalLikes}</Card.Title>
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

export default Comments
