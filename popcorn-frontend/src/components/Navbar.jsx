import React from 'react'
import logo from './logo.png'
import {Link} from "react-router-dom"

const Navbar = () => {

    return (
        <div>
            <h1>Popcorn</h1>
            <img src={logo} alt="Popcorn" style={{ width: "60px", height: "60px" }} />
            <Link to="/movies/browse">Browse Movies</Link>
            <form>
                <input type="text" name="search" placeholder="Search" />
            </form>
            <button>Login</button>
            {/* chick if login? */}
            <Link to="/user/profile">User Profile</Link>
            <button>Logout</button>
        </div>
    )
}

export default Navbar
