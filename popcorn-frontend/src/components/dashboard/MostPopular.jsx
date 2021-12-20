import axios from 'axios'
import React, { useState, useEffect } from 'react'
import WatchStatus from '../WatchStatus'
import { Link } from "react-router-dom"
import { Container, Card, Col, Row, Image } from 'react-bootstrap'
import { Text } from "react-native";
import Rating from "react-rating"
import pop_empty from "../../images/pop_blank.png"
import pop_fill from "../../images/pop_fill.png"

const MostPopular = () => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8080/api/movie')
            .then(res => setMovies(res.data.movies))
            .catch((error) => console.log(error))
    }, [])

    const OnMovieStatusChanged = (newMovie) => {
        const newMovies = []
        movies.forEach((m) => {
            m.id === newMovie.id ? newMovies.push(newMovie) : newMovies.push(m)
        })
        setMovies(newMovies)
    }

    return (
        <Container>
            <h3>Most Popular Movies</h3>
            <Row>
                {movies.map((m, index) => {
                    return (
                        <Col key={m.id}>
                            <Card style={{ width: '12rem', height: '32rem' }}>
                                <Card style={{ width: '12rem' }}>
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
                                        style={{ marginTop: "10px"}}
                                        readonly="true" stop="10" step="2" initialRating={m.score}
                                        emptySymbol={<img src={pop_empty} className="icon" style={{ width: "30px", height: "30px"}} />}
                                        fullSymbol={<img src={pop_fill} className="icon" style={{ width: "30px", height: "30px"}} />}
                                        />
                                    </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default MostPopular
