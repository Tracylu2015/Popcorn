import React, {useState, useEffect} from 'react'
import axios from 'axios'

const MyWatchHistory = () => {

    const [myWatchHistory, setMyWatchHistory] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/watchStatus/watchList/all`)
            .then(res => setMyWatchHistory(res.data))
            .catch((error) => console.log(error))
    },[])

    return (
        <div>
            <h3>My Watched History</h3>
            <ul style={{display:"flex"}}>
                {myWatchHistory.map(m =>
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

export default MyWatchHistory
