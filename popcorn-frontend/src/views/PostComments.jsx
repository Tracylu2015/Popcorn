import React from 'react'
import Rating from 'react-rating';
import pop_empty from "../images/pop_blank.png"
import pop_fill from "../images/pop_fill.png"

const PostComments = () => {


    return (
        <div>
            <h6> Rate the Movie:</h6>
            <Rating
                style={{ marginTop: "10px" }}
                stop="10" step="2"
                emptySymbol={<img src={pop_empty} alt="pop" className="icon" style={{ width: "30px", height: "30px" }} />}
                fullSymbol={<img src={pop_fill} alt="pop" className="icon" style={{ width: "30px", height: "30px" }} />}
            />
            <form>
                <p>Add your comments</p>
                <textarea name="comment" cols="30" rows="10"></textarea>
                <button >Cancel</button>
                <button >Save and Post</button>
            </form>
        </div>
    )
}

export default PostComments
