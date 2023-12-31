import React, { useEffect } from 'react'
import './Navbar.css'
import { Link, useLocation, useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode";
import { useUserLogin, useWishlist, useCart, useOrders, useSearchBar } from "../../index"
import { BsShopWindow, BsFillBagFill, BsPerson } from "react-icons/bs"
import { roleDetector } from '../../UtilityFunctions/role';

function Navbar() {

    const { userWishlist, dispatchUserWishlist } = useWishlist()
    const { userCart, dispatchUserCart } = useCart()
    const { userOrders, dispatchUserOrders } = useOrders()
    const { setUserLoggedIn } = useUserLogin(false)
    const user_id = localStorage.getItem('user_id')
    const location = useLocation()
    const { searchBarTerm, setSearchBarTerm } = useSearchBar()
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = jwt_decode(token)

            if (!user) {
                localStorage.removeItem('token')
                setUserLoggedIn(false)
            }
            else {
                setUserLoggedIn(true)
            }
        }
    }, [])

    useEffect(() => {
        function handleInvalidToken() {
            if (localStorage.getItem('token') !== null) {
                setUserLoggedIn(true)
            }
            else {
                setUserLoggedIn(false)
                dispatchUserWishlist({ type: "UPDATE_USER_WISHLIST", payload: [] })
                dispatchUserCart({ type: "UPDATE_USER_CART", payload: [] })
                dispatchUserOrders({ type: "UPDATE_USER_ORDERS", payload: [] })
            }
        }
        window.addEventListener("storage", handleInvalidToken)

        return function cleanup() {
            window.removeEventListener('storage', handleInvalidToken)
        }
    }, [userWishlist, userCart])

    function logoutUser() {
        localStorage.removeItem('token')
        dispatchUserWishlist({ type: "UPDATE_USER_WISHLIST", payload: [] })
        dispatchUserCart({ type: "UPDATE_USER_CART", payload: [] })
        dispatchUserOrders({ type: "UPDATE_USER_ORDERS", payload: [] })
        setUserLoggedIn(false)
        localStorage.clear()
        navigate('/login')
    }
    return (
        <div className="top-bar">
            <div className="left-topbar-container">
                {/* <button id="top-bar-ham-menu-btn" className="icon-btn"><i className="fa fa-bars" aria-hidden="true"></i></button> */}
                <Link to="/">
                    <h2 className="top-bar-brand-name">BOOKZ {localStorage.getItem('user_id') && (`- ${roleDetector(localStorage.getItem('user_role'))}`)}</h2>
                </Link>
                {
                    location.pathname === "/shop" &&
                    (
                        <div className="search-bar">
                            <input
                                className="search-bar-input"
                                placeholder="Search"
                                value={searchBarTerm}
                                onChange={event => setSearchBarTerm(event.target.value)}
                            />
                        </div>
                    )
                }
            </div>
            <div className="right-topbar-container">
                {localStorage.getItem('user_role') === 'A' &&
                    <Link to="/signup">
                        <button className="navbar-login-btn solid-primary-btn">Create another Admin</button>
                    </Link>

                }
                {localStorage.getItem('user_role') === 'S' &&
                    <Link to="/add_book">
                        <button className="navbar-login-btn solid-primary-btn">Add New Book</button>
                    </Link>

                }
                {localStorage.getItem('user_role') &&
                    <Link
                        to={`/profile/${user_id}`}
                        className='icon-btn'
                    >
                        <div>
                            <BsPerson />
                        </div>
                    </Link>
                }
                {
                    localStorage.getItem('token') !== null
                        ? (
                            <button onClick={logoutUser} title={localStorage.getItem('username')} className="navbar-login-btn solid-primary-btn">Logout</button>
                        )
                        : (
                            <Link to="/login">
                                <button className="navbar-login-btn solid-primary-btn">Login</button>
                            </Link>
                        )
                }
                <Link to="/shop">
                    <button className="icon-btn">
                        <div>
                            <BsShopWindow />
                        </div>
                    </button>
                </Link>
                <Link to="/wishlist">
                    <button className="icon-btn">
                        <div className="icon-count-badge">
                            <i className="fa fa-heart-o fa-x" aria-hidden="true" ></i>
                            {
                                userWishlist.length !== 0
                                && (<span className="count-badge-x">{userWishlist.length}</span>)
                            }
                        </div>
                    </button>
                </Link>
                <Link to="/cart">
                    <button className="icon-btn">
                        <div className="icon-count-badge">
                            <i className="fa fa-shopping-cart fa-x" aria-hidden="true" ></i>
                            {
                                userCart.length !== 0
                                && (<span className="count-badge-x">{userCart.length}</span>)
                            }
                        </div>
                    </button>
                </Link>
                <Link to="/orders">
                    <button className="icon-btn">
                        <div className="icon-count-badge">
                            <BsFillBagFill
                                style={{
                                    marginBottom: "4px"
                                }}
                            />
                            {
                                userOrders.length !== 0
                                && (<span className="count-badge-x">{userOrders.length}</span>)
                            }
                        </div>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export { Navbar };