import React, { useContext } from 'react'
import currentUser from '../../context/CurrentUser'


const UserInfo = () => {

    const context = useContext(currentUser)

    return (
        <div>
            <div>
                <h5 style={{marginLeft:"40px", marginTop:"20px"}}>Welcome {context.currentUser.email} !</h5>
            </div>
        </div>
    )
}

export default UserInfo
