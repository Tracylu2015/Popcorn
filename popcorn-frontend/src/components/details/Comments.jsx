import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import SortComment from '../browse/SortComment'

const Comments = () => {

    const { id } = useParams()
    const [comments, setcomments] = useState([])
    const [sort, setSort] = useState("totalLikes")

    useEffect(() => {
        axios.get(`http://localhost:8080/api/movie/comment/movie/${id}?sort=${sort}`)
            .then(res => setcomments(res.data))
            .catch((error) => console.log(error))
    }, [])

    
    return (
        <>

            <div>
                <SortComment sort={sort} setSort={setSort} />
            </div>

            <div>
                Hello!!
            </div>
            
            {comments.map((comment, i) => {
                return(
                    comment.userId.userName
                )
            })}

        </>
    )
}

export default Comments
