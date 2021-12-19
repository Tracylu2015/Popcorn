import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'

const UserButtons = ({ onSelect }) => {
    return (
        <div>
            <ListGroup as="ul">
                <ListGroup.Item as="li">
                    <button className="btn btn-block btn-info" onClick={() => onSelect(0)}>User Information</button>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <button className="btn btn-block btn-info" onClick={() => onSelect(1)}>Edit Account Info</button>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <button className="btn btn-block btn-info" onClick={() => onSelect(2)}>Show My Watch History</button>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <button className="btn btn-block btn-info" onClick={() => onSelect(3)}>Show My Wish List</button>
                </ListGroup.Item>
                <ListGroup.Item as="li">
                    <button className="btn btn-block btn-info" onClick={() => onSelect(4)}>Show My Posts</button>
                </ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default UserButtons
