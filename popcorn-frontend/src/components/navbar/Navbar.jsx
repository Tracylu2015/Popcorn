import React, { useContext } from 'react'
import logo from "../logo.png"
import { Link } from "react-router-dom"
import currentUser from '../../context/CurrentUser'
import { useHistory } from 'react-router-dom'

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
            <h1>Popcorn</h1>
            <img src={logo} alt="Popcorn" style={{ width: "60px", height: "60px" }} />
            <Link to="/movies/browse">Browse Movies</Link>
            <form>
                <input type="text" name="search" placeholder="Search" />
                <button>Search</button>
            </form>

            {context.currentUser != null ?
                <div>
                    <Link to="/user/profile">User Profile</Link>
                    <button onClick={logout} >Logout</button>
                </div>
                :
                <div>
                    <button> <Link to="/login">Login</Link></button>
                    <button> <Link to="/register">Register</Link></button>
                </div>
            }
        </div>
    )
}

export default Navbar
