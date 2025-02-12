import React from "react";

const UserCard = ({ user }) => {
    return (
        
        <div className="card" >
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
