import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Card, Row, Col, Container, Button } from 'react-bootstrap'
import ExpandableContent from 'react-expandable-content';
import ReactPaginate from 'react-paginate';

const MyPost = () => {

    const [myPost, setMyPost] = useState([])
    const [commentId, setCommentId] = useState('')
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)


    useEffect(() => {
        axios.get(`http://localhost:8080/api/comment/user?page=${page}`)
            .then(res => {
                setMyPost(res.data.comments)
                setMaxPage(res.data.maxPage)

            })
            .catch((error) => console.log(error))
    }, [page])

    const deleteComment = (e) => {
        let commentId = e.target.value;
        console.log(commentId);
        axios.get(`http://localhost:8080/api/comment/delete/${commentId}`)
            .then(res => setMyPost(res.data))
            .catch(error => console.log(error))
    }

    const handlePageClick = (event) => {
        setPage(event.selected)
    };

    return (

        <Container style={{ height: "100vh" }} >
            <h3 style={{ marginTop: "20px" }}>My Post</h3>
            <Row>
                {myPost.map((comment, i) => {
                    return (
                        <Col sm={12} style={{ marginTop: "20px" }} key={i}>
                            <Card>
                                <Card.Header as="h5">
                                    <Row>
                                        <Col>
                                            {comment.movie.primaryTitle}&nbsp;&nbsp;&nbsp;&nbsp;
                                        </Col>
                                        <Col sm={1} md={"auto"} style={{ paddingTop: "10px" }}>
                                            {comment.totalLikes}&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Button size="sm" value={comment.id} onClick={deleteComment}>Delete</Button>
                                        </Col>
                                    </Row>
                                    <p style={{ fontSize: 14 }}>{comment.created}</p>
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
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={maxPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
            />
        </Container>

    )
}

export default MyPost
