import React from 'react'

const UserButtons = ({ onSelect }) => {
    return (
        <div>

            <button style={{marginLeft:"40px", marginTop:"20px"}} className="btn btn-info" onClick={() => onSelect(0)}>User Information</button>

            <button style={{marginLeft:"20px", marginTop:"20px"}}className="btn btn-info" onClick={() => onSelect(1)}>Edit Account Info</button>

            <button style={{marginLeft:"20px", marginTop:"20px"}} className="btn btn-info" onClick={() => onSelect(2)}>Show My Watch History</button>

            <button style={{marginLeft:"20px", marginTop:"20px"}} className="btn btn-info" onClick={() => onSelect(3)}>Show My Wish List</button>

            <button style={{marginLeft:"20px", marginTop:"20px"}} className="btn btn-info" onClick={() => onSelect(4)}>Show My Posts</button>

        </div>
    )
}

export default UserButtons
