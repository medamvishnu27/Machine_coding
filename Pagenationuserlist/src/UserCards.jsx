import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/user/${user.id}`);
    };

    return (
        <div className="card" onClick={handleClick}>
            <img className="user-img" src={user.image} alt="user-img" />
            <div className="card-body">
                <h3>Name:{user.firstName}{user.lastName}{user.maidenName}</h3>
                <p>Email:{user.email}</p>
                <p>Mobile.No:{user.phone}</p>
            </div>
        </div>
    );
};

export default UserCard;
