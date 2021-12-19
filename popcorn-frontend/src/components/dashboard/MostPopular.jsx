import axios from 'axios'
import React, { useState, useEffect } from 'react'
import WatchStatus from '../WatchStatus'
import { Link } from "react-router-dom"
import Rateit from '../Rateit'

const MostPopular = () => {
    const [movies, setMovies] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8080/api/movie')
            .then(res => setMovies(res.data.movies))
            .catch((error) => console.log(error))
    }, [])

    return (
        <div>
            <h3>Most Popular Movies</h3>
            <ul style={{ display: "flex" }}>
                {movies.map(m =>
                    <Link to={`/movies/detail/${m.id}`}>
                        <li key={m.id} style={{ listStyle: "none" }}>
                            <img src={m.imageUrl} width={200} height={300} />
                            <h5>{m.primaryTitle}</h5>
                            <p>Movie Score: {m.score}</p>
                            <WatchStatus />
                            <Rateit />
                        </li>
                    </Link>
                )}
            </ul>
        </div>
    )
}

export default MostPopular
