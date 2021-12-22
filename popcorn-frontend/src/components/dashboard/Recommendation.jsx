import React, { useEffect, useState, useContext } from 'react'
import axios from "axios"
import WatchStatus from '../WatchStatus'
import Rating from 'react-rating'
import pop_empty from "../../images/pop_blank.png"
import pop_fill from "../../images/pop_fill.png"
import { Container, Card, Col, Row, Image } from 'react-bootstrap'
import { Text } from "react-native";
import { Link } from "react-router-dom"
import currentUser from '../../context/CurrentUser'

const Recommendation = () => {
    const [recMovies, setRecMovies] = useState([])
    const context = useContext(currentUser)

    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/recommend`)
            .then(res => {
                setRecMovies(res.data)
            }).catch(err => console.log(err))
    }, [])

    const OnMovieStatusChanged = (newMovie) => {
        const newMovies = []
        recMovies.forEach((m) => {
            m.id === newMovie.id ? newMovies.push(newMovie) : newMovies.push(m)
        })
        setRecMovies(newMovies)
    }

    return (
        <Container>
            {context.currentUser != null
                ?
                <div style ={{display:"flex"}}>
                    <h3>For You</h3>
                    <button style={{marginLeft:"20px"}}>Shuffle</button>
                </div>

                : <div style ={{display:"flex"}}>
                    <h3>You may like</h3>
                    <button style={{marginLeft:"20px"}}>Shuffle</button>
                </div>
            }
            <Row style={{ marginTop: "20px" }}>
                {recMovies.map((m, index) => {
                    return (
                        <Col sm={2} md="auto">
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
                                        style={{ marginTop: "10px" }}
                                        readonly="true" stop="10" step="2" initialRating={m.score}
                                        emptySymbol={<img src={pop_empty} alt="pop" className="icon" style={{ width: "30px", height: "30px" }} />}
                                        fullSymbol={<img src={pop_fill} alt="pop" className="icon" style={{ width: "30px", height: "30px" }} />}
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

export default Recommendation
