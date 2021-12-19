import React, {useState, useEffect} from 'react'
import axios from 'axios'

const MyFavorite = () => {

    const [myFavMovie, setMyFavMovie] = useState("")

    useEffect(() => {
        axios.get('http://localhost:8080/api/movie/')
            .then(res => setMyFavMovie(res.data.myFavMovie))
            .catch((error) => console.log(error))
    },[])

    return (
        <div>
            <h3>My Favorite Movies</h3>
            {/* <ul style={{display:"flex"}}>
                {myFavMovie.map(m =>
                    <li key={m.id} >
                        <img src={m.imageUrl} width={200} height={300} />
                        <h5>{m.primaryTitle}</h5>
                        <p>Movie Score: {m.score}</p>
                    </li>
                )}
            </ul> */}
        </div>
    )
}

export default MyFavorite
