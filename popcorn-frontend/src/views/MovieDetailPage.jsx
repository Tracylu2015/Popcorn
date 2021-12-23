import React, { useState } from 'react'
import Details from '../components/details/Details'
import Comments from '../components/details/Comments'


const MovieDetailPage = () => {
    const [comments, setComments] = useState([])

    const onCommentAdded = (newComment) => {
        console.log(newComment)
        setComments([...comments, newComment])
    }

    return (
        <div>
            <Details onCommentAdded={onCommentAdded}/>
            <Comments comments={comments} setComments={setComments}/>
        </div>
    )
}

export default MovieDetailPage
