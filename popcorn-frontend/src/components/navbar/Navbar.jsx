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
        // <div>
        //     <h1>Popcorn</h1>
        //     <img src={logo} alt="Popcorn" style={{ width: "60px", height: "60px" }} />
        //     <button><Link to="/movies/browse">Browse Movies</Link></button>
        //     <form>
        //         <input class="form-control mr-sm-2" type="text" name="search" placeholder="Search" />
        //         <button>Search</button>
        //     </form>
        //     {context.currentUser != null ?
        //         <div>
        //             <button><Link to="/user/profile">User Profile</Link></button>
        //             <button onClick={logout} >Logout</button>
        //         </div>
        //         :
        //         <div>
        //             <button> <Link to="/login">Login</Link></button>
        //             <button> <Link to="/register">Register</Link></button>
        //         </div>
        //     }
        // </div>
        <div class="navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box">
    <div class="flex-1 hidden px-2 mx-2 lg:flex">
        <img src={logo} alt="Popcorn" style={{ width: "60px", height: "60px" }} /> &nbsp;&nbsp;
        <span class="text-lg font-bold">
            Popcorn
        </span>
    </div>
    <div class="flex-1 px-2 mx-2">
    <div class="items-stretch hidden lg:flex">
        <Link to="/movies/browse" class="bg-neutral text-neutral-content" style={{textDecoration: "none"}}>Browse Movies</Link>
    </div>
    </div> 
    <div class="flex-1 lg:flex-none">
    <div class="form-control">
        <input type="text" placeholder="Search" class="input input-ghost " />
    </div>
    <div class="flex-none"></div>
    <form>
        <button class="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current">             
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" class="bg-neutral text-neutral-content"></path>             
        </svg>
        </button>
    </form>
    </div>
    <div class="flex-1 px-2 mx-2">
    <div class="items-stretch hidden lg:flex">
    {context.currentUser != null ?
                <div>
                    <button class="btn btn-ghost btn-sm rounded-btn"> <Link to="/user/profile" class="bg-neutral text-neutral-content" style={{textDecoration: "none"}}>User Profile</Link></button>
                    <button onClick={logout} class="btn btn-ghost btn-sm rounded-btn" class="bg-neutral text-neutral-content">Logout</button>
                </div>
                :
                <div>
                    <button class="btn btn-ghost btn-sm rounded-btn"> <Link to="/login" class="bg-neutral text-neutral-content" style={{textDecoration: "none"}}>Login</Link></button>
                    <button class="btn btn-ghost btn-sm rounded-btn"> <Link to="/register" class="bg-neutral text-neutral-content" style={{textDecoration: "none"}}>Register</Link></button>
                </div>
    }
    </div>
    </div>
</div>
    )
}

export default Navbar
