import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SortComment from '../browse/SortComment'
import { Container, Card, Col, Row } from 'react-bootstrap'
import AddLike from './AddLike'

const Comments = ({comments, setComments}) => {

    const { id } = useParams()
    const [sort, setSort] = useState("totalLikes")

    useEffect(() => {
        axios.get(`http://localhost:8080/api/comment/movie/${id}?sort=${sort}`)
            .then(res => setComments(res.data))
            .catch((error) => console.log(error))
    }, [])

    const onCommentChange = (newComment) => {
        let data = []
        comments.forEach(c => c.id === newComment.id ? data.push(newComment) : data.push(c))
        setComments(data)
    }

    return (
        <Container>
            <div>
                {comments.length !== 0 ? <SortComment sort={sort} setSort={setSort} /> : ""}
            </div>
            <Row>
                {comments.map((comment, i) => {
                    return (
                        <Col sm={8} md={"auto"} style={{ marginTop: "20px" }}>
                            <Card>
                                <Card.Header as="h5">
                                    <Row>
                                        <Col>
                                            {comment.user.username}&nbsp;&nbsp;&nbsp;&nbsp;
                                            {comment.created}
                                        </Col>
                                        <Col sm={1} md={"auto"}>
                                            <AddLike comment={comment} onCommentChange={onCommentChange} />
                                        </Col>
                                    </Row>
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

export default Comments
