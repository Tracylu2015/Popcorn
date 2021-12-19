import React, {useState, useEffect,useContext} from 'react'
import axios from 'axios'
import currentUser from '../../context/CurrentUser'

const MyWishList = () => {

    const [myFavMovie, setMyFavMovie] = useState([])
    const context = useContext(currentUser)
    const id = context.currentUser.id

    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/wishList/${id}`)
            .then(res => setMyFavMovie(res.data.movie))
            .catch((error) => console.log(error))
    },[])

    return (
        <div>
            <h3>My Wish List</h3>
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

export default MyWishList
