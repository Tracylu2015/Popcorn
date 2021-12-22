import React, { useState, useEffect } from 'react'
import WatchStatus from './WatchStatus'
import axios from 'axios'
import Rating from "react-rating"
import pop_empty from "../images/pop_blank.png"
import pop_fill from "../images/pop_fill.png"
import PostComments from './details/PostComments'
import { Button } from 'react-bootstrap'

const MyRating = ({ oneMovie, onChange, onCommentAdded}) => {

    const [showModal, setShowModal] = useState(false)
    const [score, setScore] = useState(-1)

    useEffect(() => {
        let movieId = oneMovie.id
        axios.get(`http://localhost:8080/api/rating/getScore/${movieId}`)
            .then(res => setScore(res.data.movieRatingScore))
            .catch(err => console.log(err))
    }, [oneMovie])

    console.log(oneMovie)

    const clickHandler = (e) => {
        let score = e
        let movieId = oneMovie.id
        axios.post(`http://localhost:8080/api/rating/score`, { score, movieId })
            .then(res => {
                onChange(res.data)
            })
            .catch((error) => console.log(error))
    }

    const postPicker = () => {
        setShowModal(true)
    }

    return (
        <div>
            <h5>Score: {Math.round((oneMovie.score + Number.EPSILON) * 100) / 100}</h5>
            <h6 style={{ marginTop: "20px" }}>Votes:  {oneMovie.numOfVotes}</h6>
            <WatchStatus movie={oneMovie} onChange={onChange} />
            {score !== -1 ? <h6 style={{marginTop:"20px"}}>My score: {score} </h6> : ""}
            <Rating
                onChange={clickHandler}
                style={{ marginTop: "30px" }}
                stop="10" step="2"
                initialRating={score}
                emptySymbol={<img src={pop_empty} alt="pop" className="icon" style={{ width: "35px", height: "35px" }} />}
                fullSymbol={<img src={pop_fill} alt="pop" className="icon" style={{ width: "35px", height: "35px" }} />}
            />
            <br></br>
            <Button style={{ marginTop: "20px", width: "150px" }} onClick={postPicker}>Add comment</Button>
            <PostComments oneMovie={oneMovie} setShowModal={setShowModal} showModal={showModal} onCommentAdded={onCommentAdded} />
        </div>
    )
}

export default MyRating
