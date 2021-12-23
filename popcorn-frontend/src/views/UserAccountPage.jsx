import React, { useState } from 'react'
import UserButtons from '../components/user/UserButtons'
import UserEdit from '../components/user/UserEdit'
import UserInfo from '../components/user/UserInfo'
import MyWatchHistory from '../components/user/MyWatchHistory'
import MyPost from '../components/user/MyPost'
import MyWishList from '../components/user/MyWishList'
import Container from 'react-bootstrap/Container'


const UserAccountPage = () => {

    const [options, setOptions] = useState(3)

    return (
        <>
            <div>
                <Container>
                    <UserButtons onSelect={setOptions} />
                </Container>
                <Container style={{height:"100vh"}}>
                    {
                        {
                            0: <UserInfo />,
                            1: <UserEdit onSelect={setOptions} />,
                            2: <MyWatchHistory onSelect={setOptions} />,
                            3: <MyWishList onSelect={setOptions} />,
                            4: <MyPost onSelect={setOptions} />
                        }[options]
                    }
                </Container>
            </div>
        </>
    )
}

export default UserAccountPage
