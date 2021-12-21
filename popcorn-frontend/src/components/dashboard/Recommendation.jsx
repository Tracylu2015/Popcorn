import React, { useEffect, useState } from 'react'
import axios from "axios"
import WatchStatus from '../WatchStatus'
import Rating from 'react-rating'
import pop_empty from "../../images/pop_blank.png"
import pop_fill from "../../images/pop_fill.png"
import { Container } from 'react-bootstrap'

const Recommendation = () => {
    const [recMovies, setRecMovies] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/recommend`)
            .then(res => {
                setRecMovies(res.data)
            }).catch(err => console.log(err))
    }, [])
    return (
        <Container>
            <h3 style={{marginTop:"20px"}}>Recommendations</h3>
            <ul>
                {recMovies.map(m => {
                    return (
                        <li key={m.idString}>
                            <img src={m.imageUrl} alt="movie poster" />
                            <p>Title: {m.primaryTitle}</p>
                            <p>Score: {m.score}</p>
                            <WatchStatus movie={m}/>
                            <Rating
                                style={{ marginTop: "10px" }}
                                readonly="true" stop="10" step="2" initialRating={m.score}
                                emptySymbol={<img src={pop_empty} className="icon" style={{ width: "30px", height: "30px" }} />}
                                fullSymbol={<img src={pop_fill} className="icon" style={{ width: "30px", height: "30px" }} />}
                            />
                        </li>)
                })}
            </ul>
        </Container>
    )
}

export default Recommendation
