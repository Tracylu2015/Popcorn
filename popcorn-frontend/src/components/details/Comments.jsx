import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SortComment from '../browse/SortComment'
import { Card } from 'react-bootstrap'

const Comments = () => {

    const { id } = useParams()
    const [comments, setcomments] = useState([])
    const [sort, setSort] = useState("totalLikes")

    useEffect(() => {
        axios.get(`http://localhost:8080/api/comment/movie/${id}?sort=${sort}`)
            .then(res => setcomments(res.data))
            .catch((error) => console.log(error))
    }, [])

    
    return (
        <>

            <div>
                <SortComment sort={sort} setSort={setSort} />
            </div>
            
            {comments.map((comment, i) => {
                return(
                    <Card key={i}>
                    <div>
                        <Card.Header as="h5">{comment.user.username}</Card.Header>
                        <p>{comment.created}</p>
                    </div>
                    <Card.Body>
                        <Card.Title>{comment.totalLikes}</Card.Title>
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
