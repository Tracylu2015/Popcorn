import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { Container, Card, Col, Row, Image } from 'react-bootstrap'
import { Text } from "react-native";
import Rating from "react-rating"
import pop_empty from "../../images/pop_blank.png"
import pop_fill from "../../images/pop_fill.png"


const MyWatchHistory = () => {

    const [myWatchHistory, setMyWatchHistory] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/watchStatus/watchList/all`)
            .then(res => setMyWatchHistory(res.data))
            .catch((error) => console.log(error))
    }, [])

    return (
        <Container style={{marginTop: "20px" }}>
            <h3>My Watched History</h3>
            <div style={{ marginTop: "15px" }}>
                <Row>
                    {myWatchHistory.map((m, index) => {
                        return (
                            <Col key={m.id}>
                                <Card style={{ width: '12rem', height: '28rem' }}>
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
                    <Col>
                    </Col>
                </Row>
            </div>
        </Container>
    )
}

export default MyWatchHistory
