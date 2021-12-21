import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import currentUser from '../../context/CurrentUser'
import { Container} from 'react-bootstrap'

const UserEdit = ({onSelect}) => {

    const context = useContext(currentUser)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/findOne/${context.currentUser.idString}`)
            .then(res => {
                setUsername(res.data.username)
                setEmail(res.data.email)
                setErrors([])
            })
            .catch(err => console.log(err))
    }, [])


    const EditUser = (e) => {
        e.preventDefault()
        let id = context.currentUser.idString
        axios.put(`http://localhost:8080/api/user/edit`, { username, email, id}) 
            .then(res => {
                setErrors([])
                localStorage.setItem("user",JSON.stringify(res.data))
                context.setCurrentUser(res.data)
                onSelect(0)
            })
            .catch(err => {
                if (err.response) {
                    setErrors(err.response.data.error)
                }
            })
    }

    return (
        <Container style={{marginLeft:"40px", marginTop:"20px"}}>
            <h2>Edit Profile</h2>
            {errors
                ? <div><p className="error-message">{errors}</p></div>
                : null}
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <form onSubmit={EditUser} className="form-control mt-6">
                        <input onChange={e => setUsername(e.target.value)} type="text" name="username" value ={username}placeholder="Username" className="input input-primary input-bordered  form-control mt-6" />
                        <input onChange={e => setEmail(e.target.value)} type="text" name="email" value ={email} placeholder="Email" className="input input-primary input-bordered  form-control mt-6" />

                        <div className="form-control mt-6">
                            <button className="btn btn-primary btn-active btn-sm form-control mt-6" aria-pressed="true">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </Container >
    )
}

export default UserEdit
