import React, { useState } from "react"
import "./UserAuth.css"
import { Link, useNavigate } from "react-router-dom"
import axios from '../../Components/instance'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Signup() {

    const [termsAndConditionsCheckbox, setTermsAndConditionsCheckbox] = useState(false)
    const [newUserName, setNewUserName] = useState('')
    const [newUserEmail, setNewUserEmail] = useState('')
    const [newUserPassword, setNewUserPassword] = useState('')
    const [newUserRole, setNewUserRole] = useState('')

    const navigate = useNavigate()

    function signupUser(event) {
        event.preventDefault();
        axios.post(
            "/user/register",
            {
                username: `${newUserName}`,
                email: `${newUserEmail}`,
                password: `${newUserPassword}`,
                role: `${newUserRole}`
            }
        )
            .then(res => {
                toast.success('🦄 Wow so easy!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                navigate('/login')
            })
            .catch(err => {
                toast.error('🦄 Wow so easy!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            <div className="user-auth-content-container">
                <form onSubmit={signupUser} className="user-auth-form">
                    <h2>Signup</h2>

                    <div className="user-auth-input-container">
                        <label htmlFor="user-auth-input-name"><h4>Name </h4></label>
                        <input
                            id="user-auth-input-name"
                            className="user-auth-form-input"
                            type="text"
                            placeholder="Name"
                            value={newUserName}
                            onChange={(event) => setNewUserName(event.target.value)}
                            required />
                    </div>

                    <div className="user-auth-input-container">
                        <label htmlFor="user-auth-input-email"><h4>Email address</h4></label>
                        <input
                            id="user-auth-input-email"
                            className="user-auth-form-input"
                            type="email"
                            placeholder="Email"
                            value={newUserEmail}
                            onChange={(event) => setNewUserEmail(event.target.value)}
                            required />
                    </div>

                    <div className="user-auth-input-container">
                        <label htmlFor="user-auth-input-password"><h4>Password</h4></label>
                        <input
                            id="user-auth-input-password"
                            className="user-auth-form-input"
                            type="password"
                            placeholder="Password"
                            value={newUserPassword}
                            onChange={(event) => setNewUserPassword(event.target.value)}
                            required />
                    </div>
                    {localStorage.getItem('user_role') === 'A' && 
                    <div className="user-auth-input-container">
                        <label htmlFor="user-auth-input-password"><h4>Role</h4></label>
                        <select className="user-auth-form-input" value={newUserRole} onChange={(event) => setNewUserRole(event.target.value)}>
                            <option value="A">Admin</option>
                            <option value="S">Seller</option>
                            <option value="B">Buyer</option>
                        </select>
                    </div>
}

                    <div className="accept-terms-container">
                        <input
                            type="checkbox"
                            id="accept-terms"
                            checked={termsAndConditionsCheckbox}
                            onChange={() => setTermsAndConditionsCheckbox(prevState => !prevState)}
                        />
                        <label htmlFor="accept-terms">I accept all terms and conditions</label>
                    </div>

                    <button
                        type="submit"
                        className="solid-success-btn form-user-auth-submit-btn"
                        disabled={termsAndConditionsCheckbox ? "" : true}
                    >
                        Create New Account
                    </button>

                    <div className="existing-user-container">
                        <Link to="/login" className="links-with-blue-underline existing-user-link" id="existing-user-link">
                            Already have an account &nbsp;
                        </Link>
                    </div>

                </form>
            </div>
        </>
    )
}

export { Signup }