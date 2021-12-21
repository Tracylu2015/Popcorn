import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SortComment from '../browse/SortComment'
import { Card } from 'react-bootstrap'

const Comments = () => {

    const { id } = useParams()
    const [comments, setComments] = useState([])
    const [sort, setSort] = useState("totalLikes")

    useEffect(() => {
        axios.get(`http://localhost:8080/api/comment/movie/${id}?sort=${sort}`)
            .then(res => setComments(res.data))
            .catch((error) => console.log(error))
    }, [])

    const onCommentChange = (newComment) => {
        let data = []
        comments.forEach(c => c.idString === newComment.idString ? data.push(newComment) : data.push(c))
        setComments(data)
    }

    return (
        // <>

        //     <div>
        //         <SortComment sort={sort} setSort={setSort} />
        //     </div>

            <div>
                {comments.length !== 0 ? <SortComment sort={sort} setSort={setSort} /> : ""}
            </div>

            {comments.map((comment) => {
                return (
                    <Card key={comment.id}>
                        <Card.Header as="h5">
                            {comment.user.username}
                            <p>{comment.created}</p>
                            <AddLike comment={comment} onCommentChange={onCommentChange} />
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {comment.post}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}
        </>
    )
}

export default Comments
