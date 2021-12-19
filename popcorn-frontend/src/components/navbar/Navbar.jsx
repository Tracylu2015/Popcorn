import React, { useContext } from 'react'
import logo from "../logo.png"
import { Link } from "react-router-dom"
import currentUser from '../../context/CurrentUser'
import { useHistory } from 'react-router-dom'
import bootstrap from 'bootstrap'

const Navbar = () => {

    const context = useContext(currentUser)
    console.log(context.currentUser)
    const history = useHistory()

    const logout = () => {
        context.setCurrentUser(null)
        history.push("/")
    }

    console.log(context.currentUser)

    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <h1>Popcorn</h1>
            <img src={logo} alt="Popcorn" style={{ width: "60px", height: "60px" }} />
            <button class="btn btn-warning"><Link to="/movies/browse">Browse Movies</Link></button>
            <form>
                <input class="form-control mr-sm-2" type="text" name="search" placeholder="Search" />
                <button class="btn btn-warning">Search</button>
            </form>
            {context.currentUser != null ?
                <div>
                    <button class="btn btn-warning"><Link to="/user/profile">User Profile</Link></button>
                    <button onClick={logout} class="btn btn-warning">Logout</button>
                </div>
                :
                <div>
                    <button class="btn btn-warning"> <Link to="/login">Login</Link></button>
                    <button class="btn btn-warning"> <Link to="/register">Register</Link></button>
                </div>
            }
            </nav>
        </div>


    )
}

export default Navbar
