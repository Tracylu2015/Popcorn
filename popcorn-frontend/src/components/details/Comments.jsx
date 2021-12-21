import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SortComment from '../browse/SortComment'
import { Card, Container, Row, Col } from 'react-bootstrap'
import AddLike from './AddLike'

const Comments = () => {

    const { id } = useParams()
    const [comments, setComments] = useState([])
    const [sort, setSort] = useState("totalLikes")

    useEffect(() => {
        axios.get(`http://localhost:8080/api/comment/movie/${id}?sort=${sort}`)
            .then(res => setComments(res.data))
            .catch((error) => console.log(error))
    }, [])

    const onCommentChange = (newComment) => {
        let data = []
        comments.forEach(c => c.idString === newComment.idString ? data.push(newComment) : data.push(c))
        setComments(data)
    }

    return (
        <Container>
            <Row>
                {comments.length !== 0 ? <SortComment sort={sort} setSort={setSort} /> : ""}
            </Row>
            <Row>
                {comments.map((comment, i) => {
                    return (
                        <Col sm={8} md={"auto"}>
                            <Card>
                                <Card.Header as="h5">{comment.user.username}</Card.Header>
                                <Card.Body>
                                    <Card.Text>{comment.created}</Card.Text>
                                    <AddLike comment={comment} onCommentChange={onCommentChange} />
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
