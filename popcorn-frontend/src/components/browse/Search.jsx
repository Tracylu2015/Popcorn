import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"

const Search = (props) => {
    const query = props.query;
    const [select, setSelect] = useState("Action")
    const [movies, setMovies] = useState([])
    const [sort, setSort] = useState("year")
    
    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/search/${query}/${select}?sort=${sort}`)
            .then(res => {
                setMovies(res.data)
            })
            .catch(e => console.log(e))
    }, [select, sort])

    return (
        <div>
            <div>
                <h5>Choose a Movie By Category</h5>
                <button onClick={(e) => { setSelect("Action") }}>Action</button>
                <button onClick={(e) => { setSelect("Adventure") }}>Adventure</button>
                <button onClick={(e) => { setSelect("Animation") }}>Animation</button>
                <button onClick={(e) => { setSelect("Comedy") }}>Comedy</button>
                <button onClick={(e) => { setSelect("Drama") }}>Drama</button>
                <button onClick={(e) => { setSelect("Horror") }}>Horror</button>
                <button onClick={(e) => { setSelect("Romance") }}>Romance</button>
                <button onClick={(e) => { setSelect("War") }}>War</button>

            </div>
            <SortMovie sort={sort} setSort={setSort} />
            <div>
                <ul style={{ listStyle: "none", display: "flex" }}>

                    {movies.map((m) =>
                        <Link to={`/movies/detail/${m.id}`} key={m.id}>
                            <li key={m.id}>
                                <img src={m.imageUrl} width={200} height={300} />
                                <p>{m.primaryTitle}</p>
                                <p>{m.score}</p>
                            </li>
                        </Link>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Search