import './App.css';
import { useEffect, useLayoutEffect } from 'react';
import axios from "axios"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {
  Navbar,
  Home,
  Shop,
  ProductPage,
  Login,
  Signup,
  Wishlist,
  Cart,
  Orders,
  useUserLogin,
  useWishlist,
  useCart
} from "./index"
import UserProfile from './Pages/Profile/Profile';
import { AddBook } from './Pages/AddBook/AddBook';

function App() {

  const { userLoggedIn } = useUserLogin()
  const { dispatchUserWishlist } = useWishlist()
  const { dispatchUserCart } = useCart()


  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/shop" exact element={<Shop />} />
          <Route path="/shop/:id" element={<ProductPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile/:_id" element={<UserProfile />} />
          {localStorage.getItem('token') && <Route path="/add_book" element={<AddBook />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;