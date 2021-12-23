import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SortComment from '../browse/SortComment'
import { Container, Card, Col, Row } from 'react-bootstrap'
import AddLike from './AddLike'
import ExpandableContent from 'react-expandable-content';
import ReactPaginate from 'react-paginate';

const Comments = ({ comments, setComments }) => {

    const { id } = useParams()
    const [sort, setSort] = useState("totalLikes")
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:8080/api/comment/movie/${id}?sort=${sort}&page=${page}`)
            .then(res => {
                setComments(res.data.comments)
                setMaxPage(res.data.maxPage)
            })
            .catch((error) => console.log(error))
    }, [page])

    const onCommentChange = (newComment) => {
        let data = []
        comments.forEach(c => c.id === newComment.id ? data.push(newComment) : data.push(c))
        setComments(data)
    }

    const handlePageClick = (event) => {
        setPage(event.selected)
    };

    return (
        <Container style={{ height: "100vh" }}>
            <div>
                {comments.length !== 0  ? <SortComment sort={sort} setSort={setSort} /> : ""}
            </div>
            <Row>
                {comments.map((comment, i) => {
                    return (
                        <Col sm={12} style={{ marginTop: "20px" }}>
                            <Card>
                                <Card.Header as="h5">
                                    <Row>
                                        <Col style={{ marginBottom: "-15px" }}>
                                            {comment.user.username}&nbsp;&nbsp;&nbsp;&nbsp;
                                            <p style={{ fontSize: 14, marginTop: "10px" }}>{new Date(Date.parse(comment.created)).toLocaleString()}</p>
                                        </Col>
                                        <Col sm={1} md={"auto"}>
                                            <AddLike comment={comment} onCommentChange={onCommentChange} />
                                        </Col>
                                    </Row>
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

export default Comments
