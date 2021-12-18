import React from 'react'
import WatchStatus from './WatchStatus'

const PostComments = () => {
    return (
        <div>
            <WatchStatus />
            <Rateit />
            <form action="">
                <p>Set Tags and separate by space</p>
                <input type="text" name="tags" />
                <p>Add your comments</p>
                <textarea name="comment" cols="30" rows="10"></textarea>
                <button>Cancel</button>
                <button>Save and Post</button>
            </form>
        </div>
    )
}

export default PostComments
