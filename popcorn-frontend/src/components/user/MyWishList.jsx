import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import { Container, Card, Col, Row, Image } from 'react-bootstrap'
import { Text } from "react-native";
import Rating from "react-rating"
import pop_empty from "../../images/pop_blank.png"
import pop_fill from "../../images/pop_fill.png"

const MyWishList = () => {

    const [myFavMovie, setMyFavMovie] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/watchStatus/wishList/all`)
            .then(res => setMyFavMovie(res.data))
            .catch((error) => console.log(error))
    }, [])

    return (
        // <div>
        //     <h3 style={{marginLeft:"40px", marginTop:"20px"}}>My Wish List</h3>
        //     <ul style={{display:"flex"}}>
        //         {myFavMovie.map(m =>
        //             <li key={m.idString} >
        //                 <img src={m.imageUrl} width={200} height={300} />
        //                 <h5>{m.primaryTitle}</h5>
        //                 <p>Movie Score: {m.score}</p>
        //             </li>
        //         )}
        //     </ul>
        // </div>
        <Container style={{marginTop: "20px" }}>
            <h3>My Wish List</h3>
            <div style={{ marginTop: "15px" }}>
                <Row>
                    {myFavMovie.map((m, index) => {
                        return (
                            <Col key={m.id}>
                                <Card style={{ width: '12rem', height: '28rem'}}>
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
                                            style={{ marginTop: "10px" }}
                                            readonly="true" stop="10" step="2" initialRating={m.score}
                                            emptySymbol={<img src={pop_empty} className="icon" style={{ width: "30px", height: "30px" }} />}
                                            fullSymbol={<img src={pop_fill} className="icon" style={{ width: "30px", height: "30px" }} />}
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

export default MyWishList
