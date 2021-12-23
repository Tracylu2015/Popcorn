import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SortMovie from "./SortMovie"
import { Link } from "react-router-dom"
import { ButtonGroup, Button, Container, Card, Col, Row, Image } from 'react-bootstrap'
import { Text } from "react-native";
import Rating from "react-rating"
import WatchStatus from '../WatchStatus'
import pop_empty from "../../images/pop_blank.png"
import pop_fill from "../../images/pop_fill.png"
import ReactPaginate from 'react-paginate';

const Categories = () => {

    const [select, setSelect] = useState("Action")
    const [movies, setMovies] = useState([])
    const [sort, setSort] = useState("numOfVotes")
    const [page, setPage] = useState(0)
    const [maxPage, setMaxPage] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/categories/${select}?sort=${sort}&page=${page}`)
            .then(res => {
                setMovies(res.data.movies)
                setMaxPage(res.data.maxPage)
            })
            .catch(e => console.log(e))
    }, [select, sort, page])

    const OnMovieStatusChanged = (newMovie) => {
        const newMovies = []
        movies.forEach((m) => {
            m.id === newMovie.id ? newMovies.push(newMovie) : newMovies.push(m)
        })
        setMovies(newMovies)
    }

    const handlePageClick = (event) => {
        setPage(event.selected)
    };
    
    return (
        <Container>
            <div>
                <h4>Choose a Movie By Category</h4>
                <ButtonGroup aria-label="Basic example">
                    <Button onClick={(e) => { setSelect("Action") }} variant="info">Action</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => { setSelect("Adventure") }} variant="info">Adventure</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => { setSelect("Animation") }} variant="info">Animation</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => { setSelect("Comedy") }} variant="info">Comedy</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => { setSelect("Crime") }} variant="info">Crime</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => { setSelect("Drama") }} variant="info">Drama</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => { setSelect("Family") }} variant="info">Family</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => { setSelect("Fantasy") }} variant="info">Fantasy</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => { setSelect("Horror") }} variant="info">Horror</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => { setSelect("Romance") }} variant="info">Romance</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => { setSelect("Sci-Fi") }} variant="info">Science</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => { setSelect("Thriller") }} variant="info">Thriller</Button>&nbsp;&nbsp;&nbsp;
                    <Button onClick={(e) => { setSelect("War") }} variant="info">War</Button>
                </ButtonGroup>
            </div>
            <SortMovie sort={sort} setSort={setSort} />
            <div style={{ marginTop: "15px" }}>
                <Row>
                    {movies.map((m) => {
                        return (
                            <Col key={m.id} sm={2} md="auto">
                                <Card style={{ width: '12rem', height: '32rem' }}>
                                    <Card>
                                        <Link to={`/movies/detail/${m.id}`} style={{ textDecoration: "none" }}>
                                            <Image src={m.imageUrl} className="rounded-l" style={{ objectFit: "cover", height: '300px' }} />
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
                                            Movie Score: {m.score}
                                        </Card.Text>
                                        <WatchStatus movie={m} onChange={OnMovieStatusChanged} />
                                        <Rating
                                            style={{ marginTop: "10px" }}
                                            readonly="true" stop="10" step="2" initialRating={m.score}
                                            emptySymbol={<img src={pop_empty} alt ="pop" className="icon" style={{ width: "30px", height: "30px" }} />}
                                            fullSymbol={<img src={pop_fill} alt ="pop" className="icon" style={{ width: "30px", height: "30px" }} />}
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

export default Categories
