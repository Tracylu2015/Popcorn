import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '../Rating'
import { Container, Card, Col, Row } from 'react-bootstrap'

const Details = () => {

    const { id } = useParams()
    const [oneMovie, setOneMovie] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/${id}`)
            .then(res => setOneMovie(res.data))
            .catch((error) => console.log(error))
    }, [])

    const onStatusChanged = (newMovie)=>{
        console.log(newMovie)
        setOneMovie(newMovie)
    }

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
                                        <img src={oneMovie.imageUrl} style={{ width: 320 , height:400}} />
                                    </Col>
                                    <Col>
                                        <div><b>Directors:</b> {oneMovie.hasOwnProperty("directors") ? oneMovie.directors.map(d => (<span key={d}>{d} </span>)) : "not available"}</div>
                                        <div><b>Genres: </b>{oneMovie.hasOwnProperty("genres") ? oneMovie.genres.map(g => (<span key={g}>{g} </span>)) : "not available"}</div>
                                        <div><b>Regions:</b> {oneMovie.hasOwnProperty("regions") ? oneMovie.regions.map(r => (<span key={r}>{r} </span>)) : "not available"}</div>
                                        {oneMovie.language !== "" ? <p> <b>Language: </b>{oneMovie.language}</p> : ""}
                                        <div><b>Duration: </b> {oneMovie.runtimeMinutes} mins</div>

                                        <div>
                                            <h5>About it...</h5>
                                            <p>{oneMovie.description}</p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Rating oneMovie={oneMovie} onChange={onStatusChanged}/>
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
