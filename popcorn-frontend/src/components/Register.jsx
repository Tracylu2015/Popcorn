import React, { useState } from 'react';




const Register = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    const Register = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/register', { name, email, password, _id }) //get post api
            .then(res => {
                setErrors([])
                history.push('/')
            })
            .catch(err => {
                setErrors(err)
            })
    }

    return (
        <div>
            <h2>Register</h2>
            {errors
                ? <div><p className="error-message">{errors}</p></div>
                : null}
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <form onSubmit={Register} className="form-control mt-6">
                        <input onChange={e => setName(e.target.value)} type="text" name="name" placeholder="Username" className="input input-primary input-bordered  form-control mt-6" />
                        <input onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="Email" className="input input-primary input-bordered  form-control mt-6" />
                        <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" className="input input-primary input-bordered  form-control mt-6" />
                        <input onChange={e => setConfirmPassword(e.target.value)} type="password" name="confirm_password" placeholder="Confirm Password" className="input input-primary input-bordered  form-control mt-6" />
                        <div className="form-control mt-6">
                            <button className="btn btn-primary btn-active btn-sm form-control mt-6" role="button" aria-pressed="true">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Register

