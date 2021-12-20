import React, {useState, useEffect,useContext} from 'react'
import axios from 'axios'
import currentUser from '../../context/CurrentUser'
import { Container, Card, Col, Row, Image } from 'react-bootstrap'

const MyPost = () => {

    const [myPost, setMyPost] = useState('')
    const context = useContext(currentUser)
    const id = context.currentUser.id

    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/posts/${id}`)
            .then(res => setMyPost(res.data.comment))
            .catch((error) => console.log(error))
    },[])

    return (
        <Container style={{ marginLeft: "40px", marginTop: "20px" }}>
            <h3>My Post</h3>
        </Container>
    )
}

export default MyPost
