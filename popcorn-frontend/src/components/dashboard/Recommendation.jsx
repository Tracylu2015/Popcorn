import React, { useEffect, useState } from 'react'
import axios from "axios"
import WatchStatus from '../WatchStatus'
import Rating from 'react-rating'
import pop_empty from "../../images/pop_blank.png"
import pop_fill from "../../images/pop_fill.png"


const Recommendation = () => {
    const [recMovies, setRecMovies] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/recommend`)
            .then(res => {
                setRecMovies(res.data)
            }).catch(err => console.log(err))
    }, [])
    return (

        <div>
            <h3>Recommendations</h3>
            <ul>
                {recMovies.map(m => {
                    <li key={m.id}>
                        <img src={m.imageUrl} alt="movie poster" />
                        <p>Title: {m.primaryTitle}</p>
                        <p>Score: {m.score}</p>
                        <WatchStatus />
                        <Rating
                            style={{ marginTop: "10px" }}
                            readonly="true" stop="10" step="2" initialRating={m.score}
                            emptySymbol={<img src={pop_empty} className="icon" style={{ width: "30px", height: "30px" }} />}
                            fullSymbol={<img src={pop_fill} className="icon" style={{ width: "30px", height: "30px" }} />}
                        />
                    </li>
                })}
            </ul>
        </div>
    )
}

export default Recommendation
