import axios from 'axios'
import React from 'react'


const AddLike = ({ comment, onCommentChange }) => {

    const addLike = (e) => {
        let like_status = e.target.value
        console.log(comment)
        let commentId = comment.id
        axios.post(`http://localhost:8080/api/userLike/addLike`, { like_status, commentId })
            .then(res => {
                onCommentChange(res.data)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <p>{comment.totalLikes}</p>
                {comment.likeStatus?<button onClick={addLike} value="false">unlike</button> 
                    : <button onClick={addLike} value="true">like</button>
                }
        </div>
    )
}

export default AddLike
