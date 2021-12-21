import React, {useState, useEffect,useContext} from 'react'
import axios from 'axios'
import currentUser from '../../context/CurrentUser'
import { Container, Card} from 'react-bootstrap'

const MyPost = () => {

    const [myPost, setMyPost] = useState([])
    // const context = useContext(currentUser)
    // const id = context.currentUser.id

    useEffect(() => {
        axios.get(`http://localhost:8080/api/comment/user`)
            .then(res => setMyPost(res.data))
            .catch((error) => console.log(error))
    },[])

    return (
        <Container style={{ marginLeft: "40px", marginTop: "20px" }}>
            {<h3>My Post</h3>}
            {myPost.map((comment, i) => {
                return(
                    <Card key={i}>
                    <div>
                        <Card.Header as="h5">{comment.movie.primaryTitle}</Card.Header>
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
        </Container>
    )
}

export default MyPost
