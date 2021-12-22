import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import MyRating from '../MyRating'
import { Container, Card, Col, Row } from 'react-bootstrap'
import {Text} from "react-native"

const Details = ({onCommentAdded}) => {

    const { id } = useParams()
    const [oneMovie, setOneMovie] = useState({})


    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/${id}`)
            .then(res => setOneMovie(res.data))
            .catch((error) => console.log(error))
    }, [])

    const onStatusChanged = (newMovie) => {
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
                                        <img src={oneMovie.imageUrl} style={{ width: 320, height: 400 }} alt="movie poster" />
                                    </Col>
                                    <Col style={{ lineHeight: "30px" }}>
                                        <div><b>Directors:</b> {oneMovie.hasOwnProperty("directors") ? oneMovie.directors.map(d => (<span key={d}>{d} </span>)) : "not available"}</div>
                                        <div><b>Genres: </b>{oneMovie.hasOwnProperty("genres") ? oneMovie.genres.map(g => (<span key={g}>{g} </span>)) : "not available"}</div>
                                        <Text style ={{fontSize:"16px"}} numberOfLines={1}><b>Regions:</b> {oneMovie.hasOwnProperty("regions") ? oneMovie.regions.map(r => (<span key={r}>{r} </span>)) : "not available"}</Text>
                                    {oneMovie.language !== "" ? <p> <b>Language: </b>{oneMovie.language}</p> : ""}
                                    <div><b>Duration: </b> {oneMovie.runtimeMinutes} mins</div>
                                    {oneMovie.videoUrl !== null ? <p><b> Trailer: </b><a href={oneMovie.videoUrl}>{oneMovie.videoUrl}</a></p> : ""}
                                    {oneMovie.description !== null ? <div>
                                        <h6>About this Movie...</h6>
                                        <p>{oneMovie.description}</p>
                                    </div> : ""}
                                </Col>
                                <Col>
                                    <MyRating oneMovie={oneMovie} onChange={onStatusChanged} onCommentAdded={onCommentAdded}/>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Body>
                </Card>
            </Col>
        </div>
        </Container >
    )
}

export default Details
