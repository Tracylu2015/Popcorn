import React, { useState } from 'react';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const createUser = (e) => {
        e.preventDefault();
        const newUser = { email, password };
    };


    return (
        <div>
            <form onSubmit={createUser}>
                <div>
                    <label>Email Address: </label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="text" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <input type="submit" value="Create User" />
            </form>
        </div>

    )
}

export default Login
