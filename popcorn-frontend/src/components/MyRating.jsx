import React, {useState} from 'react'
import WatchStatus from './WatchStatus'
import axios from 'axios'
import Rating from "react-rating"
import pop_empty from "../images/pop_blank.png"
import pop_fill from "../images/pop_fill.png"
import PostComments from './details/PostComments'
import {Button} from 'react-bootstrap'

const MyRating = ({ oneMovie, onChange, readonly }) => {

    const [showModal, setShowModal] = useState(false)

    const clickHandler = (e) => {
        let score = e
        let movieId = oneMovie.id
        axios.post(`http://localhost:8080/api/comment/score/new`, { score, movieId })
            .then(res => {
                onChange(res.data)
                console.log(res)
            })
            .catch((error) => console.log(error))
    }

    const postPicker = () => {
        setShowModal(true)
    }

    return (
        <div>
            <h5>Score: {Math.round((oneMovie.score + Number.EPSILON) * 100) / 100}</h5>
            <h6 style={{marginTop:"20px"}}>Votes:  {oneMovie.numOfVotes}</h6>
            <WatchStatus movie={oneMovie} onChange={onChange} />
            <Rating
                onChange={e => readonly === "true" ? null : clickHandler(e)}
                style={{ marginTop: "30px" }}
                readonly={readonly} stop="10" step="2"
                initialRating={oneMovie.score}
                emptySymbol={<img src={pop_empty} alt="pop" className="icon" style={{ width: "35px", height: "35px" }} />}
                fullSymbol={<img src={pop_fill} alt="pop" className="icon" style={{ width: "35px", height: "35px" }} />}
            />
            <br></br>
            <Button style = {{marginTop:"20px", width:"150px"}} onClick = {postPicker}>Add comment</Button>
            <PostComments oneMovie={oneMovie} setShowModal={setShowModal} showModal={showModal}/>
        </div>
    )
}

export default MyRating
