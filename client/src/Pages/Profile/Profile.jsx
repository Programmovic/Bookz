import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "../../Components/instance";

function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwt_decode(token);
            if (decodedToken) {
                (async function fetchUserProfile() {
                    try {
                        const response = await axios.get("/user/profile", {
                            headers: {
                                'x-access-token': token
                            }
                        });
                        setUser(response.data.user);
                    } catch (error) {
                        console.error(error);
                    }
                })();
            }
        }
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h2>User Profile</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Name: {user.name}</h5>
                    <p className="card-text"><strong>Email:</strong> {user.email}</p>
                    <p className="card-text"><strong>Username:</strong> {user.username}</p>
                    <p className="card-text"><strong>Role:</strong> {user.role}</p>
                    {/* Add more profile information as needed */}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;