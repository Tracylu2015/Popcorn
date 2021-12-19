import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '../Rating'

const Details = () => {

    const { id } = useParams()
    const [oneMovie, setOneMovie] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/${id}`)
            .then(res => setOneMovie(res.data))
            .catch((error) => console.log(error))
    }, [])


    return (
        // <div>
        //     <div>
        //         <h3>{oneMovie.primaryTitle} ({oneMovie.startYear})</h3>
        //         <img src={oneMovie.imageUrl} width={200} height={300} />
        //         <ul style={{ listStyle: "none"}}>
        //             <li >Directors: {oneMovie.hasOwnProperty("directors") ? oneMovie.directors.map(d => (
        //                 <p key={d}>{d }</p>
        //             )) : "not available"}
        //             </li>
        //             <li>
        //             Genres: {oneMovie.hasOwnProperty("genres") ? oneMovie.genres.map(g=> (
        //                 <p key={g}>{g }</p>
        //             )) : "not available"}
        //             </li>

        //             <li>
        //                 Regions: {oneMovie.hasOwnProperty("regions") ? oneMovie.regions.map(r=> (
        //                 <p key={r}>{r }</p>
        //             )) : "not available"}
        //                 </li>
        //             {oneMovie.language !== "" ? <li>Language: {oneMovie.language}</li> : ""}
        //             <li>Duration: {oneMovie.runtimeMinutes}</li>
        //         </ul>
        //         <Rating oneMovie={oneMovie} />
        //     </div>
        //     <div>
        //         <h4>About it...</h4>
        //         <p>{oneMovie.description}</p>
        //     </div>
        // </div>
        <div className="card lg:card-side bordered">
            <h2 className="card-title">{oneMovie.primaryTitle} ({oneMovie.startYear})</h2>
            <figure>
                <img src={oneMovie.imageUrl} />
            </figure>
            <div className="card-body">
                <ul style={{ listStyle: "none" }}>
                    <li >Directors: {oneMovie.hasOwnProperty("directors") ? oneMovie.directors.map(d => (
                        <p key={d}>{d}</p>
                    )) : "not available"}
                    </li>
                    <li>
                        Genres: {oneMovie.hasOwnProperty("genres") ? oneMovie.genres.map(g => (
                            <p key={g}>{g}</p>
                        )) : "not available"}
                    </li>

                    <li>
                        Regions: {oneMovie.hasOwnProperty("regions") ? oneMovie.regions.map(r => (
                            <p key={r}>{r}</p>
                        )) : "not available"}
                    </li>
                    {oneMovie.language !== "" ? <li>Language: {oneMovie.language}</li> : ""}
                    <li>Duration: {oneMovie.runtimeMinutes}</li>
                </ul>
                <div className="card-actions">
                    <button className="btn btn-primary"><Rating oneMovie={oneMovie} /></button>
                </div>
                <div>
                    <h4>About it...</h4>
                    <p>{oneMovie.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Details
