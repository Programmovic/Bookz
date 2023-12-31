import React, { useState, useEffect } from "react";
import axios from "../../Components/instance";
import { roleDetector } from "../../UtilityFunctions/role";

function UserProfile() {
    const [user, setUser] = useState(null);
    const id = localStorage.getItem('user_id');

    useEffect(() => {


        if (id) {
            async function fetchUserProfile() {
                try {
                    const response = await axios.get(`/user/${id}`);
                    setUser(response.data);
                    console.log(response.data)
                } catch (error) {
                    console.error(error);
                }
            };
            fetchUserProfile()
        }

    }, user);


    return (
        <>
            {user ?
                <div className="container">
                    <h2>User Profile</h2>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Name: {user.name}</h5>
                            <p className="card-text"><strong>Email:</strong> {user.email}</p>
                            <p className="card-text"><strong>Username:</strong> {user.username}</p>
                            <p className="card-text"><strong>Role:</strong> {roleDetector(user.role)}</p>
                            {/* Add more profile information as needed */}
                        </div>
                    </div>
                </div>
                :
                <div className="container">
                    <h2>Not Authenticated</h2>
                </div>}
        </>
    );
}

export default UserProfile;