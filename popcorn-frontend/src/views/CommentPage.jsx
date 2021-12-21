import React from 'react'
import Rating from '../components/MyRating'
import Details from '../components/Details'
import WatchStatus from '../components/WatchStatus'
import { Link } from 'react-router-dom'
import Comments from '../components/Comments'
import pop_empty from "../images/pop_blank.png"
import pop_fill from "../images/pop_fill.png"

const CommentPage = () => {
    return (
        <div>
            <Details />
            <WatchStatus/>
            <Rating
                style={{ marginTop: "10px" }}
                stop="10" step="2" 
                emptySymbol={<img src={pop_empty} className="icon" style={{ width: "30px", height: "30px" }} />}
                fullSymbol={<img src={pop_fill} className="icon" style={{ width: "30px", height: "30px" }} />}
            />
            <Link to="/movies/post">Post a Comment</Link>
            <Comments />
        </div>
    )
}

export default CommentPage
