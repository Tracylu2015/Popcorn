import React, { useState, useContext } from 'react'
import logo from "../logo.png"
import { Link } from "react-router-dom"
import currentUser from '../../context/CurrentUser'
import { useHistory } from 'react-router-dom'
import { Image, FormControl } from 'react-bootstrap'


const Navbar = () => {

    const context = useContext(currentUser)
    const history = useHistory()
    const [query, setQuery] = useState("")

    const logout = () => {
        context.setCurrentUser(null)
        localStorage.clear();
        history.push("/")
    }

    const search = () => {
        history.push(`/movies/search/${query}`);
    }

    const onLogoClicked = () => {
        history.push("/")
    }

    return (
        <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
            <div className="flex-none hidden px-2 mx-2 lg:flex" onClick={onLogoClicked}>
                <Image src={logo} alt="Popcorn" style={{ width: "60px", height: "60px" }} /> &nbsp;&nbsp;
                <span className="text-lg font-bold">
                    Popcorn
                </span>
            </div>
            <div className="flex-1 px-2 mx-2">
                <div className="items-stretch hidden lg:flex">
                    <Link to="/movies/browse" className="bg-neutral text-neutral-content" style={{ textDecoration: "none" }}>Browse Movies</Link>
                </div>
            </div>
            <div className="flex-1 lg:flex-none" style={{width:"400px"}} >
                <FormControl onChange={e => setQuery(e.target.value)}
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                />
                <div className="flex-none"></div>
                <form>
                    <button className="btn btn-square btn-ghost" onClick={search}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="bg-neutral text-neutral-content"></path>
                        </svg>
                    </button>
                </form>
            </div>
            <div className="flex-2 px-2 mx-2">
                <div className="items-stretch hidden lg:flex">
                    {context.currentUser != null ?
                        <div>
                            <button> <Link to="/user/profile" className="link-neutral text-neutral-content" style={{ textDecoration: "none", marginRight: "10px" }}>Profile</Link></button>
                            <button onClick={logout} ><Link className="link-neutral text-neutral-content" style={{ textDecoration: "none", marginRight: "10px" }}>Logout</Link></button>
                        </div>
                        :
                        <div>
                            <button> <Link to="/login" className="bg-neutral text-neutral-content" style={{ textDecoration: "none", margin: "20px" }}>Login</Link></button>
                            <button> <Link to="/register" className="bg-neutral text-neutral-content" style={{ textDecoration: "none" }}>Register</Link></button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
