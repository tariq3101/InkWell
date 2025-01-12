import React from 'react';
import './LikesModal.css';

const LikesModal = ({ users, onClose }) => {
    return (
        <div className="likesModal">
            <div className="likesModalContent">
                <span className="close" onClick={onClose}>&times;</span>
                <h3>Users Who Liked This Post:</h3>
                <ul>
                    {users.map((user) => (
                        <li key={user}>
                            <a href={`/?user=${user}`} className="link">{user}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LikesModal;
