import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SortMovie from "./SortMovie"
import { Link } from "react-router-dom"
import { ButtonGroup, Button, Container, Card, Col, Row } from 'react-bootstrap'

const Categories = () => {

    const [select, setSelect] = useState("Action")
    const [movies, setMovies] = useState([])
    const [sort, setSort] = useState("year")

    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/categories/${select}?sort=${sort}`)
            .then(res => {
                setMovies(res.data)
            })
            .catch(e => console.log(e))
    }, [select, sort])

    return (
        <div>
            <div>
                <h4>Choose a Movie By Category</h4>
                <ButtonGroup aria-label="Basic example">
                    <Button onClick={(e) => { setSelect("Action") }} variant="info">Action</Button>
                    <Button onClick={(e) => { setSelect("Adventure") }} variant="info">Adventure</Button>
                    <Button onClick={(e) => { setSelect("Animation") }} variant="info">Animation</Button>
                    <Button onClick={(e) => { setSelect("Comedy") }} variant="info">Comedy</Button>
                    <Button onClick={(e) => { setSelect("Drama") }} variant="info">Drama</Button>
                    <Button onClick={(e) => { setSelect("Horror") }} variant="info">Horror</Button>
                    <Button onClick={(e) => { setSelect("Romance") }} variant="info">Romance</Button>
                    <Button onClick={(e) => { setSelect("War") }} variant="info">War</Button>
                </ButtonGroup>
            </div>
            <SortMovie sort={sort} setSort={setSort} />
            {/* <div>
                <ul style={{ listStyle: "none", display: "flex" }}>

                    {movies.map((m) =>
                        <Link to={`/movies/detail/${m.id}`} key={m.id}>
                            <li key={m.id}>
                                <img src={m.imageUrl} width={200} height={300} />
                                <p>{m.primaryTitle}</p>
                                <p>{m.score}</p>
                            </li>
                        </Link>
                    )}
                </ul>
            </div> */}
            <div>
                <Container>
                    <Row>
                        {movies.map((m, index) => {
                            return (
                                <Col key={m.id}>
                                    <Card style={{ width: '12rem', height: '27rem' }}>
                                        <Card>
                                            <Link to={`/movies/detail/${m.id}`} style={{ textDecoration: "none" }}><img src={m.imageUrl} className="rounded-xl" /></Link>
                                        </Card>
                                        <Card.Body>
                                            <Card.Title>{m.primaryTitle}</Card.Title>
                                            <Card.Text className="text-warning">
                                                Movie Score: {m.score}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                        <Col>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default Categories
