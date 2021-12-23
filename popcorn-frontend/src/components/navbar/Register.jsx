import React, { useState,useContext } from 'react';
import axios from "axios"
import { useHistory } from "react-router-dom"
import currentUser from "../../context/CurrentUser"


const Register = () => {

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const context = useContext(currentUser)

    const Register = (e) => {
        e.preventDefault()
        if (password!==confirmPassword){
            setErrors([...errors,"Password doesn't match"])
            history.push("/register")
        }
        else{
        axios.post('http://localhost:8080/api/user/register', { username, email, password }) //get post api
            .then(res => {
                setErrors([])
                context.setCurrentUser(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                history.push('/')
            })
            .catch(err => {
                if (err.response) {
                    setErrors(err.response.data.error)
                }
            })
        }
    }

    return (
        <div style={{height:"100vh"}}>
            {errors
                ? <div><p className="error-message">{errors}</p></div>
                : null}
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <form onSubmit={Register} className="form-control mt-6">
                        <input onChange={e => setUsername(e.target.value)} type="text" name="username" placeholder="Username" className="input input-primary input-bordered  form-control mt-6" />
                        <input onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="Email" className="input input-primary input-bordered  form-control mt-6" />
                        <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" className="input input-primary input-bordered  form-control mt-6" />
                        <input onChange={e => setConfirmPassword(e.target.value)} type="password" name="confirm_password" placeholder="Confirm Password" className="input input-primary input-bordered  form-control mt-6" />
                        <div className="form-control mt-6">
                            <button className="btn btn-primary btn-active btn-sm form-control mt-6"  aria-pressed="true">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Register

