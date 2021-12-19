import React, {useState, useEffect} from 'react'
import axios from 'axios'

const MyPost = () => {

    const [myPost, setMyPost] = useState('')

    useEffect(() => {
        axios.get('http://localhost:8080/api/movie/')
            .then(res => setMyPost(res.data.myPost))
            .catch((error) => console.log(error))
    },[])

    return (
        <div>
            <h3>My Post</h3>
        </div>
    )
}

export default MyPost
