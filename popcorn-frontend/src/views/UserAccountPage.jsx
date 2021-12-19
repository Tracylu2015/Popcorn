import React, { useState } from 'react'
import UserButtons from '../components/user/UserButtons'
import UserEdit from '../components/user/UserEdit'
import UserInfo from '../components/user/UserInfo'
import MyWatchHistory from '../components/user/MyWatchHistory'
import MyPost from '../components/user/MyPost'
import MyWishList from '../components/user/MyWishList'

const UserAccountPage = () => {

    const [options, setOptions] = useState(0)

    return (
        <div>
            <UserButtons onSelect={setOptions} />
            <div>
                {
                    {
                    0: <UserInfo />,
                    1: <UserEdit onSelect={setOptions} />,
                    2: <MyWatchHistory onSelect={setOptions} />,
                    3: <MyWishList onSelect={setOptions} />,
                    4: <MyPost onSelect={setOptions} />
                    }[options]
                }
            </div>
        </div>
    )
}

export default UserAccountPage
