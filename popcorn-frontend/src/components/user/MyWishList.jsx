import React, {useState, useEffect} from 'react'
import axios from 'axios'

const MyWishList = () => {

    const [myFavMovie, setMyFavMovie] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/watchStatus/wishList/all`)
            .then(res => setMyFavMovie(res.data))
            .catch((error) => console.log(error))
    },[])

    return (
        <div>
            <h3>My Wish List</h3>
            <ul style={{display:"flex"}}>
                {myFavMovie.map(m =>
                    <li key={m.idString} >
                        <img src={m.imageUrl} width={200} height={300} />
                        <h5>{m.primaryTitle}</h5>
                        <p>Movie Score: {m.score}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default MyWishList
