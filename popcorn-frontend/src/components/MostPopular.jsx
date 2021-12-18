import axios from 'axios'
import React, { useState, useEffect } from 'react'
import WatchStatus from './WatchStatus'

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
            <ul style={{display:"flex"}}>
                {movies.map(m =>
                    <li key={m.id} >
                        <img src={m.imageUrl} width={200} height={300} />
                        <h5>{m.primaryTitle}</h5>
                        <p>Movie Score: {m.score}</p>
                        <WatchStatus />
                    </li>
                )}
            </ul>
        </div>
    )
}

export default MostPopular
