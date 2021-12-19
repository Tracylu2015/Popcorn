import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const UserEdit = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])
    const history = useHistory()


    useEffect(() => {
        axios.get('http://localhost:8080/api/user/')
            .then(res => {
                setUsername(res.data.username)
                setEmail(res.data.email)
                setPassword(res.data.password)
                setConfirmPassword(res.data.password)
                setErrors([])
            })
            .catch(err => console.log(err))
    }, [])


    const EditUser = (e) => {
        e.preventDefault()
        axios.put('http://localhost:8080/api/user/edit/', { username, email, password }) 
            .then(res => {
                setErrors([])
                history.push('/user/profile')
            })
            .catch(err => {
                if (err.response) {
                    setErrors(err.response.data.error)
                }
            })
    }

    return (
        <div>
            <h2>Edit Profile</h2>
            {errors
                ? <div><p className="error-message">{errors}</p></div>
                : null}
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <form onSubmit={EditUser} className="form-control mt-6">
                        <input onChange={e => setUsername(e.target.value)} type="text" name="username" placeholder="Username" className="input input-primary input-bordered  form-control mt-6" />
                        <input onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="Email" className="input input-primary input-bordered  form-control mt-6" />
                        <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" className="input input-primary input-bordered  form-control mt-6" />
                        <input onChange={e => setConfirmPassword(e.target.value)} type="password" name="confirm_password" placeholder="Confirm Password" className="input input-primary input-bordered  form-control mt-6" />
                        <div className="form-control mt-6">
                            <button className="btn btn-primary btn-active btn-sm form-control mt-6" role="button" aria-pressed="true">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default UserEdit
