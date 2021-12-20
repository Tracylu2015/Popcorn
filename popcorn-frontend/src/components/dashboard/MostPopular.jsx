import axios from 'axios'
import React, { useState, useEffect } from 'react'
import WatchStatus from '../WatchStatus'
import { Link } from "react-router-dom"
import Rateit from '../Rateit'
import { Container, Card, Col, Row} from 'react-bootstrap'

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
        <div>
            <Container>
            <h3>Most Popular Movies</h3>
                <Row>
                {movies.map((m, index) => {
                    return (
                    <Col>
                    <Card style={{ width: '12rem', height:'32rem'}}>
                        <Card style={{ width: '12rem'}}>
                            <Link to={`/movies/detail/${m.id}`} key={m.id} style={{ textDecoration: "none" }}><img src={m.imageUrl} className="rounded-xl" /></Link>
                        </Card>
                        <Card.Body>
                            <Card.Title>{m.primaryTitle}</Card.Title>
                            <Card.Text>
                                <p className="text-warning">Movie Score: {m.score}</p>
                            </Card.Text>
                            <WatchStatus movie={m} onChange={OnMovieStatusChanged} />
                            <Rateit movie={m} />
                        </Card.Body>
                    </Card>
                    </Col>
                    )
                })}
                </Row>
            </Container>
        </div>
    )
}

export default MostPopular
