import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '../Rating'
import { Container, Card, Col } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'

const Details = () => {

    const { id } = useParams()
    const [oneMovie, setOneMovie] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/${id}`)
            .then(res => setOneMovie(res.data))
            .catch((error) => console.log(error))
    }, [])


    return (
        <Container>
            <div>
                <Col>
                    <Card>
                        <Card.Header as="h3">{oneMovie.primaryTitle} ({oneMovie.startYear})</Card.Header>
                        <Card.Body>
                            <Container>
                                <Row>
                                    <Col>
                                        <img src={oneMovie.imageUrl} style={{ width: 320 }} />
                                    </Col>
                                    <Col>
                                        <h4>Directors: {oneMovie.hasOwnProperty("directors") ? oneMovie.directors.map(d => (<span key={d}>{d}</span>)) : "not available"}</h4>
                                        <div>Genres: {oneMovie.hasOwnProperty("genres") ? oneMovie.genres.map(g => (<span key={g}>{g}</span>)) : "not available"}</div>
                                        <div>Regions: {oneMovie.hasOwnProperty("regions") ? oneMovie.regions.map(r => (<span key={r}>{r}</span>)) : "not available"}</div>
                                        {oneMovie.language !== "" ? <p>Language: {oneMovie.language}</p> : ""}
                                        <div>Duration: {oneMovie.runtimeMinutes}</div>

                                        <div>
                                            <h4>About it...</h4>
                                            <p>{oneMovie.description}</p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Rating oneMovie={oneMovie} />
                                    </Col>
                                </Row>
                            </Container>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        </Container>
    )
}

export default Details
