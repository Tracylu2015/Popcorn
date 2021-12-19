import axios from 'axios'
import React, { useContext } from 'react'
import currentUser from '../context/CurrentUser'

const WatchStatus = ({movie, onChange}) => {
    const context = useContext(currentUser)
    let userId 
    if (context.currentUser!=null){
        console.log(context.currentUser)
        userId = context.currentUser.id
    }
    // const mId = movie.id
    const mId = ""
    
    const addList = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/watchStatus/wishList', { userId, mId})
            .then(res => {
                movie.watchStatus="wish"
                onChange(movie)
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }

    const watched = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/api/watchStatus/watched', { userId, mId })
            .then(res => {
                movie.watchStatus="watched"
                onChange(movie)
                console.log(res.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <div>
            <form onSubmit={addList}>
                <button>Add to List</button>
            </form>
            <form onSubmit={watched}>
                <button>Watched</button>
            </form>
        </div>
    )
}

export default WatchStatus
