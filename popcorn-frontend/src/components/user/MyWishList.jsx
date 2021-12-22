import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { Container, Card, Col, Row, Image } from 'react-bootstrap'
import { Text } from "react-native";
import Rating from "react-rating"
import pop_empty from "../../images/pop_blank.png"
import pop_fill from "../../images/pop_fill.png"
import ReactPaginate from 'react-paginate';

const MyWishList = () => {

    const [myFavMovie, setMyFavMovie] = useState([])
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:8080/api/watchStatus/wishList/all?page=${page}`)
            .then(res => {
                setMyFavMovie(res.data.movies)
                setMaxPage(res.data.maxPage)
            })
            .catch((error) => console.log(error))
    }, [page])


    const handlePageClick = (event) => {
        setPage(event.selected)
    };

    return (
        <Container style={{ marginTop: "20px" }}>
            <h3>My Wish List</h3>
            <div style={{ marginTop: "15px" }}>
                <Row>
                    {myFavMovie.map((m, index) => {
                        return (
                            <Col key={m.id} sm={2} md="auto">
                                <Card style={{ width: '12rem', height: '28rem' }}>
                                    <Card>
                                        <Link to={`/movies/detail/${m.id}`} style={{ textDecoration: "none" }}>
                                            <Image src={m.imageUrl} className="rounded-l" style={{ objectFit: "cover", height: '300px' }} alt="poster" />
                                        </Link>
                                    </Card>
                                    <Card.Body>
                                        <Text style={{
                                            fontWeight: "bold",
                                            fontSize: "20px",
                                            marginBottom: "10px",
                                        }} numberOfLines={1}>{m.primaryTitle}
                                        </Text>
                                        <Card.Text className="text-warning">
                                            Movie Score: {Math.round((m.score + Number.EPSILON) * 100) / 100}
                                        </Card.Text>
                                        <Rating
                                            style={{ marginTop: "10px" }}
                                            readonly="true" stop="10" step="2" initialRating={m.score}
                                            emptySymbol={<img src={pop_empty} alt = "pop" className="icon" style={{ width: "30px", height: "30px" }} />}
                                            fullSymbol={<img src={pop_fill} alt ="pop"className="icon" style={{ width: "30px", height: "30px" }} />}
                                        />
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                    <Col>
                    </Col>
                </Row>
            </div>
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

export default MyWishList
