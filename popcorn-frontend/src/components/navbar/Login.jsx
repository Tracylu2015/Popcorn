import React, {useState,useContext} from 'react';
import {useHistory} from "react-router-dom"
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
        axios.post('http://localhost:8080/api/user/login', {email, password}) //get mongo sign in ID
            .then(res => {
                context.setCurrentUser(res.data)
                console.log(context.currentUser)
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
        <div>
            <form onSubmit={createUser}>
                <div>
                    {signInError
                        ? <div><p className="error-message">{signInError}</p></div>
                        : null}
                    <label>Email Address: </label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <input type="submit" value="Sign In"/>
            </form>
        </div>

    )
}

export default Login
