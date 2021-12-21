import React, { useState } from 'react'
import WatchStatus from './WatchStatus'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Rating from "react-rating"
import pop_empty from "../images/pop_blank.png"
import pop_fill from "../images/pop_fill.png"

const MyRating = ({ oneMovie, onChange }) => {


    // axios.get(`http://localhost:8080/api/movie/${id}`)
    //     .then(res => setOneMovie(res.data.movie))
    //     .catch((error) => console.log(error))

    return (
        <div>
            <h4>Score: {oneMovie.score}</h4>
            <p>Number of Votes: {oneMovie.numOfVotes}</p>
            <WatchStatus movie={oneMovie} onChange={onChange} />
            <p style={{ marginTop: "20px" }}>My Rate for the movie</p>
            <Rating
                style={{ marginTop: "10px" }}
                stop="10" step="2" 
                emptySymbol={<img src={pop_empty} className="icon" style={{ width: "30px", height: "30px" }} />}
                fullSymbol={<img src={pop_fill} className="icon" style={{ width: "30px", height: "30px" }} />}
            />
            <br></br>
            <Link to="/movie/comments/new">Add a comment</Link>
        </div>
    )
}

export default MyRating
