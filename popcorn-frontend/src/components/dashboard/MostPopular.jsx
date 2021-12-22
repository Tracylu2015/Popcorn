import axios from 'axios'
import React, { useState, useEffect } from 'react'
import WatchStatus from '../WatchStatus'
import { Link } from "react-router-dom"
import { Container, Card, Col, Image } from 'react-bootstrap'
import { Text } from "react-native";
import Rating from "react-rating"
import pop_empty from "../../images/pop_blank.png"
import pop_fill from "../../images/pop_fill.png"

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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

    //Carousel function show responsively
    const responsive = {
        desktop: {
                breakpoint: { max: 3000, min: 1024 },
            items: 6,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <Container>
            <h3>Most Popular Movies</h3>
            <Carousel
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={3000}
                infinite={true}
            >
                {movies.map(m => {
                    return (
                        <Col key={m.idString}>
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
                                        Movie Score: {Math.round((m.score + Number.EPSILON) * 100) / 100}
                                    </Card.Text>
                                    <WatchStatus movie={m} onChange={OnMovieStatusChanged} />
                                    <Rating
                                        style={{ marginTop: "10px" }}
                                        readonly="true" stop="10" step="2" initialRating={m.score}
                                        emptySymbol={<img src={pop_empty} alt ="pop"  className="icon" style={{ width: "30px", height: "30px" }} />}
                                        fullSymbol={<img src={pop_fill} alt ="pop" className="icon" style={{ width: "30px", height: "30px" }} />}
                                    />
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </Carousel>
        </Container>
    )
}

export default MostPopular
