import axios from 'axios'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import currentUser from '../context/CurrentUser'


const WatchStatus = ({ movie, onChange }) => {
    const context = useContext(currentUser)
    const mId = movie.id
    const history = useHistory()

    const addList = (e) => {
        let userId
        if (context.currentUser != null) {
            userId = context.currentUser.idString
        } else {
            return history.push("/login")
        }

        e.preventDefault()
        axios.post('http://localhost:8080/api/watchStatus/wishList', { userId, mId })
            .then(res => {
                movie.watchStatus = "wish"
                onChange(movie)
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }

    const watched = (e) => {
        e.preventDefault()
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
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <form onSubmit={addList}>
                <button disabled={movie.watchStatus==="watched"}>Add to List</button>
            </form>
            <form onSubmit={watched}>
                <button disabled={movie.watchStatus==="wished"}>Watched</button>
            </form>
        </div>
    )
}

export default WatchStatus
