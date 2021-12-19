import React, {useEffect, useState }  from 'react'
import axios from 'axios';
import UserEdit from './UserEdit';
import MyPost from './MyPost';
import MyFavorite from './MyFavorite';
import MyWatchHistory from './MyWatchHistory';
import { render } from '@testing-library/react';

const UserProfile = () => {

    const [user, setUser] = useState('')
    const [isEdit, setEdit] = useState(false);
    const [isMyFav, setMyFav] = useState(false);
    const [isWatched, setWatched] = useState(false);
    const [isMyPost, setMyPost] = useState(false);
    

    useEffect(() => {
        axios.get('http://localhost:8080/api/user', user)
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
    }, [])

    const editProfile = e => {
        e.preventDefault();
        setEdit(true)
    }

    const showMyFav = e => {
        e.preventDefault();
        setMyFav(true)
    }

    const showWatched = e => {
        e.preventDefault();
        setWatched(true)
    }

    const showMyPost = e => {
        e.preventDefault();
        setMyPost(true)
    }

    return (
        <div>
            <h2>Welcome, {user.username}</h2>
            <div>
                <button type="submit" onClick={editProfile}>Edit Info</button>
                <button onClick={showMyFav}>My Favorite</button>
                <button onClick={showWatched}>Watched History</button>
                <button onClick={showMyPost}>My Post</button>
            </div>     
            {isEdit && <UserEdit/>}
            {isMyFav && <MyFavorite/>}
            {isWatched && <MyWatchHistory/>}
            {isMyPost && <MyPost/>}
        </div>
    )
}

export default UserProfile
