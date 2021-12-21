import React, { useContext } from 'react'
import currentUser from '../../context/CurrentUser'
import { Container} from 'react-bootstrap'


const UserInfo = () => {

    const context = useContext(currentUser)

    return (
        <Container style={{ marginLeft: "40px", marginTop: "20px" }}>
            <div>
                <h5>Welcome {context.currentUser.email} !</h5>
            </div>
        </Container>
    )
}

export default UserInfo
