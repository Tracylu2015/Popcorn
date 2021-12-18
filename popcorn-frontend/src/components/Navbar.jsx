import React, { useContext } from 'react'
import logo from './logo.png'
import { Link } from "react-router-dom"
import CurrentUser from '../context/CurrentUser'

const Navbar = () => {

    const context = useContext(CurrentUser)

    return (
        <div>
            <h1>Popcorn</h1>
            <img src={logo} alt="Popcorn" style={{ width: "60px", height: "60px" }} />
            <Link to="/movies/browse">Browse Movies</Link>
            <form>
                <input type="text" name="search" placeholder="Search" />
            </form>

            {context.CurrentUser != null ?
                <div>
                    <Link to="/user/profile">User Profile</Link>
                    <button><Link to="/logout">Logout</Link></button>
                </div> : <button> <Link to="/login">Login</Link></button>
            }
        </div>
    )
}

export default Navbar
