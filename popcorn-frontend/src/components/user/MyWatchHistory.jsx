import React, {useState, useEffect,useContext} from 'react'
import axios from 'axios'
import currentUser from '../../context/CurrentUser'

const MyWatchHistory = () => {

    const [myWatchHistory, setMyWatchHistory] = useState([])
    const context = useContext(currentUser)
    const id = context.currentUser.id

    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/watchlist/${id}`)
            .then(res => setMyWatchHistory(res.data.movie))
            .catch((error) => console.log(error))
    },[])

    return (
        <div>
            <h3>My Watched History</h3>
            {/* <ul style={{display:"flex"}}>
                {myWatchHistory.map(m =>
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

export default MyWatchHistory
