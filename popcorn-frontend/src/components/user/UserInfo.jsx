import React, { useContext } from 'react'
import currentUser from '../../context/CurrentUser'

const UserInfo = () => {

    const context = useContext(currentUser)

    return (
        <div>
            <div>
                <img src={context.currentUser.avatar} alt="avatar" width={40} height={40} />
                <p>User Name: {context.currentUser.username}</p>
                <p>Email: {context.currentUser.email}</p>
            </div>
        </div>
    )
}

export default UserInfo
