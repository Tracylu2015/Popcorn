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

    const OnMovieStatusChanged = (newMovie) => {
        const newMovies=[]
        movies.forEach((m)=>{
            m.id===newMovie.id? newMovies.push(newMovie): newMovies.push(m)})
        setMovies(newMovies)
    }

    return (
        <div>
            <h3>Most Popular Movies</h3>
            <div class="card text-center shadow-2xl">
            <ul style={{ display: "flex" }}>
                {movies.map(m =>
                    <Link to={`/movies/detail/${m.id}`} key={m.id} style={{textDecoration: "none"}}>
                        <li key={m.id} style={{ listStyle: "none" }}>
                            <img src={m.imageUrl} class="rounded-xl"/>
                            <div class="card-body card-actions">
                            <h2 class="card-title text-neutral-focus ">{m.primaryTitle}</h2>
                            <p class="text-warning">Movie Score: {m.score}</p>
                            <div class="justify-center card-actions">
                            <button class="btn btn-outline btn-accent"><WatchStatus /></button>
                            <button class="btn btn-outline btn-accent"><Rateit /></button>
                            </div>
                            </div>
                            <WatchStatus movie={m} onChange={OnMovieStatusChanged}/>
                            <Rateit movie={m}/>
                        </li>
                    </Link>
                )}
            </ul>
            </div>
        </div>
    )
}

export default MostPopular
