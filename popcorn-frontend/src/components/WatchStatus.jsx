import axios from 'axios'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import currentUser from '../context/CurrentUser'


const WatchStatus = ({ movie, onChange }) => {
    const context = useContext(currentUser)
    const mId = movie.id
    const history = useHistory()

    const addList = () => {
        let userId
        if (context.currentUser != null) {
            userId = context.currentUser.idString
        } else {
            return history.push("/login")
        }

        axios.post('http://localhost:8080/api/watchStatus/wishList', { userId, mId })
            .then(res => {
                movie.watchStatus = "wish"
                onChange(movie)
            })
            .catch((err) => console.log(err))
    }

    const watched = () => {
        let userId
        if (context.currentUser != null) {
            userId = context.currentUser.idString
        } else {
            return history.push("/login")
        }
        axios.post('http://localhost:8080/api/watchStatus/watched', { userId, mId })
            .then(res => {
                movie.watchStatus = "watched"
                onChange(movie)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div style={{ display: "flex", marginTop:"20px"}}>
            <button onClick={addList} className="btn btn-primary btn-sm">Wish</button>&nbsp;&nbsp;
            <button onClick={watched} className="btn btn-primary btn-sm">Watched</button>
        </div>
    )
}

export default WatchStatus
