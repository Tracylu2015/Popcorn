import React, { useContext } from 'react'
import logo from "../logo.png"
import { Link } from "react-router-dom"
import currentUser from '../../context/CurrentUser'
import { useHistory } from 'react-router-dom'


const Navbar = () => {

    const context = useContext(currentUser)
    const history = useHistory()

    const logout = () => {
        context.setCurrentUser(null)
        localStorage.clear();
        history.push("/")
    }


    return (

        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
            <div className="flex-1 hidden px-2 mx-2 lg:flex">
                <img src={logo} alt="Popcorn" style={{ width: "60px", height: "60px" }} /> &nbsp;&nbsp;
                <span className="text-lg font-bold">
                    Popcorn
                </span>
            </div>
            <div className="flex-1 px-2 mx-2">
                <div className="items-stretch hidden lg:flex">
                    <Link to="/movies/browse" className="bg-neutral text-neutral-content" style={{ textDecoration: "none" }}>Browse Movies</Link>
                </div>
            </div>
            <div className="flex-1 lg:flex-none">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-ghost " />
                </div>
                <div className="flex-none"></div>
                <form>
                    <button className="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="bg-neutral text-neutral-content"></path>
                        </svg>
                    </button>
                </form>
            </div>
            <div className="flex-1 px-2 mx-2">
                <div className="items-stretch hidden lg:flex">
                    {context.currentUser != null ?
                        <div>
                            <button className="btn btn-ghost btn-sm rounded-btn"> <Link to="/user/profile" className="bg-neutral text-neutral-content" style={{ textDecoration: "none" }}>User Profile</Link></button>
                            <button onClick={logout} className="btn btn-ghost btn-sm rounded-btn" className="bg-neutral text-neutral-content">Logout</button>
                        </div>
                        :
                        <div>
                            <button className="btn btn-ghost btn-sm rounded-btn"> <Link to="/login" className="bg-neutral text-neutral-content" style={{ textDecoration: "none" }}>Login</Link></button>
                            <button className="btn btn-ghost btn-sm rounded-btn"> <Link to="/register" className="bg-neutral text-neutral-content" style={{ textDecoration: "none" }}>Register</Link></button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
