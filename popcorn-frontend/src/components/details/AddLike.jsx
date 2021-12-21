import axios from 'axios'
import React, {useState} from 'react'
import like from '../../images/like_button.png'

const AddLike = () => {

    const [like,setLike]=useState("false")
    const addLike = ()=>{
        let like_status = like
        axios.post(`http://localhost:8080/api/comment/addLike`),{like_status}
        .then(res=>{
            setLike("true")
        })
        
    }

    return (
        <div>
            <button onClick ={addLike} value ={like}><img src={like} alt="like"/></button>
        </div>
    )
}

export default AddLike
