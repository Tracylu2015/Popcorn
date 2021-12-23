import React, { useState, useContext } from 'react';
import { useHistory } from "react-router-dom"
import axios from "axios"
import currentUser from '../../context/CurrentUser';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signInError, setSignInError] = useState('')
    const history = useHistory()
    const context = useContext(currentUser)

    const createUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/user/login', { email, password }) //get mongo sign in ID
            .then(res => {
                context.setCurrentUser(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                history.push('/')
            })
            .catch((error) => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    setSignInError(error.response.data.error)
                }
            })
    }

    return (
        <div style={{height:"100vh"}}>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <form onSubmit={createUser} className="form-control mt-6">
                        <div>
                            {signInError
                                ? <div><p className="error-message">{signInError}</p></div>
                                : null}
                            <input className="input input-primary input-bordered form-control mt-6" type="text" name="email" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                            <input className="input input-primary input-bordered form-control mt-6" type="password" name="password" placeholder="Password" onChange={e => setPassword(e.target.value)} value={password} />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary btn-active btn-sm form-control mt-6" aria-pressed="true">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
