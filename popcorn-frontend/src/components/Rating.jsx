import React, { useState } from 'react'
import Rateit from './Rateit'
import WatchStatus from './WatchStatus'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'

const Rating = ({oneMovie,onChange}) => {


    // axios.get(`http://localhost:8080/api/movie/${id}`)
    //     .then(res => setOneMovie(res.data.movie))
    //     .catch((error) => console.log(error))

    return (
        <div>
            <h4>Score: {oneMovie.score}</h4>
            <p>Number of Votes: {oneMovie.numOfVotes}</p>
            <WatchStatus movie={oneMovie} onChange={onChange} />
            <p>My Rate for the movie</p>
            <Rateit movie={oneMovie} />
            <Link to ="/movie/comments/new">Add a comment</Link>
        </div>
    )
}

export default Rating
