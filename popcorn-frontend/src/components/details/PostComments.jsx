import React from 'react'
import Modal from 'react-modal'
import axios from 'axios';
import CurrentUser from '../../context/CurrentUser';

const PostComments = () => {

    const context = React.useContext(CurrentUser)

    return (
        <div>

            <form action="">
                <p>Set Tags and separate by space</p>
                <input type="text" name="tags" />
                <p>Add your comments</p>
                <textarea name="comment" cols="30" rows="10"></textarea>
                <button >Cancel</button>
                <button >Save and Post</button>
            </form>
        </div>
    )
}

export default PostComments
