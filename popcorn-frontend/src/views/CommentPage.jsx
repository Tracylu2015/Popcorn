import React from 'react'
import Rating from '../components/MyRating'
import Details from '../components/Details'
import WatchStatus from '../components/WatchStatus'
import { Link } from 'react-router-dom'
import Comments from '../components/Comments'

const CommentPage = () => {
    return (
        <div>
            <Details />
            <Rating />
            <WatchStatus />
            {/* <Rateit /> */}
            <Link to="/movies/post">Post a Comment</Link>
            <Comments />
        </div>
    )
}

export default CommentPage
