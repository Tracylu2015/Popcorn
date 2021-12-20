import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '../Rating'
import { Container, Card, Col } from 'react-bootstrap'

const Details = () => {

    const { id } = useParams()
    const [oneMovie, setOneMovie] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/${id}`)
            .then(res => setOneMovie(res.data))
            .catch((error) => console.log(error))
    }, [])


    return (
        // <div className="card lg:card-side bordered">
        //     <figure>
        //         <img src={oneMovie.imageUrl} />
        //     </figure>
        //     <div className="card-body">
        //         <h2 className="card-title">{oneMovie.primaryTitle} ({oneMovie.startYear})</h2>
        //         <p>Directors: {oneMovie.hasOwnProperty("directors") ? oneMovie.directors.map(d => (<span key={d}>{d}</span>)) : "not available"}</p>
        //         <p>Genres: {oneMovie.hasOwnProperty("genres") ? oneMovie.genres.map(g => (<span key={g}>{g}</span>)) : "not available"}</p>
        //         <p>Regions: {oneMovie.hasOwnProperty("regions") ? oneMovie.regions.map(r => (
        //             <span key={r}>{r}</span>)) : "not available"}</p>
        //         {oneMovie.language !== "" ? <p>Language: {oneMovie.language}</p> : ""}
        //         <p>Duration: {oneMovie.runtimeMinutes}</p>
        //         <Rating oneMovie={oneMovie} />
        //         <div>
        //             <h4>About it...</h4>
        //             <p>{oneMovie.description}</p>
        //         </div>
        //     </div>
        // </div>
        <Container>
            <div>
                <Col>
                    <Card>
                        <Card.Header as="h3">{oneMovie.primaryTitle} ({oneMovie.startYear})</Card.Header>
                        <Card.Body>
                            <Card.Text style={{ display: 'flex'}}>
                                <Col>
                                    <img src={oneMovie.imageUrl} style={{width:320}}/>
                                </Col>
                                <Col>
                                    <h4>Directors: {oneMovie.hasOwnProperty("directors") ? oneMovie.directors.map(d => (<span key={d}>{d}</span>)) : "not available"}</h4>
                                    <p>Genres: {oneMovie.hasOwnProperty("genres") ? oneMovie.genres.map(g => (<span key={g}>{g}</span>)) : "not available"}</p>
                                    <p>Regions: {oneMovie.hasOwnProperty("regions") ? oneMovie.regions.map(r => (<span key={r}>{r}</span>)) : "not available"}</p>
                                    {oneMovie.language !== "" ? <p>Language: {oneMovie.language}</p> : ""}
                                    <p>Duration: {oneMovie.runtimeMinutes}</p>
                                    
                                    <div>
                                        <h4>About it...</h4>
                                        <p>{oneMovie.description}</p>
                                    </div>
                                </Col>
                                <Col>
                                <Rating oneMovie={oneMovie} />
                                </Col>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        </Container>
    )
}

export default Details
