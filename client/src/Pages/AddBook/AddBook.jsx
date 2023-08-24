import React, { useState } from "react";
import "./AddBook.css";
import axios from '../../Components/instance';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddBook() {
    const [bookName, setBookName] = useState('');
    const [author, setAuthor] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState('');
    const [discountPercent, setDiscountPercent] = useState('');
    const [imgSrc, setImgSrc] = useState('');
    const [imgAlt, setImgAlt] = useState('');
    const [badgeText, setBadgeText] = useState('');
    const [outOfStock, setOutOfStock] = useState(false);
    const [fastDeliveryAvailable, setFastDeliveryAvailable] = useState(false);
    const [genre, setGenre] = useState('');
    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');

    function addBook(event) {
        event.preventDefault();
        axios.post(
            "/books",
            {
                sellerID: localStorage.getItem('id'),
                bookName: bookName,
                author: author,
                originalPrice: originalPrice,
                discountedPrice: discountedPrice,
                discountPercent: discountPercent,
                imgSrc: imgSrc,
                imgAlt: imgAlt,
                badgeText: badgeText,
                outOfStock: outOfStock,
                fastDeliveryAvailable: fastDeliveryAvailable,
                genre: genre,
                rating: rating,
                description: description
            }
        )
            .then(res => {
                toast.success('Book added successfully!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                // Reset form fields after successful book addition
                setBookName('');
                setAuthor('');
                setOriginalPrice('');
                setDiscountedPrice('');
                setDiscountPercent('');
                setImgSrc('');
                setImgAlt('');
                setBadgeText('');
                setOutOfStock(false);
                setFastDeliveryAvailable(false);
                setGenre('');
                setRating('');
                setDescription('');
            })
            .catch(err => {
                toast.error('Failed to add book. Please try again.', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                console.log(err.message)
            });
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
                <form onSubmit={addBook} className="user-auth-form w-75">
                    <h2>Add Book</h2>
                    <div className="row">
                        <div className="col-3">
                            <div className="user-auth-input-container">
                                <label htmlFor="book-name"><h4>Book Name</h4></label>
                                <input
                                    id="book-name"
                                    className="user-auth-form-input"
                                    type="text"
                                    placeholder="Book Name"
                                    value={bookName}
                                    onChange={(event) => setBookName(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="user-auth-input-container">
                                <label htmlFor="author"><h4>Author</h4></label>
                                <input
                                    id="author"
                                    className="user-auth-form-input"
                                    type="text"
                                    placeholder="Author"
                                    value={author}
                                    onChange={(event) => setAuthor(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="user-auth-input-container">
                                <label htmlFor="original-price"><h4>Original Price</h4></label>
                                <input
                                    id="original-price"
                                    className="user-auth-form-input"
                                    type="number"
                                    placeholder="Original Price"
                                    value={originalPrice}
                                    onChange={(event) => setOriginalPrice(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="user-auth-input-container">
                                <label htmlFor="discounted-price"><h4>Discounted Price</h4></label>
                                <input
                                    id="discounted-price"
                                    className="user-auth-form-input"
                                    type="number"
                                    placeholder="Discounted Price"
                                    value={discountedPrice}
                                    onChange={(event) => setDiscountedPrice(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className="user-auth-input-container">
                                <label htmlFor="discount-percent"><h4>Discount Percent</h4></label>
                                <input
                                    id="discount-percent"
                                    className="user-auth-form-input"
                                    type="number"
                                    placeholder="Discount Percent"
                                    value={discountPercent}
                                    onChange={(event) => setDiscountPercent(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="user-auth-input-container">
                                <label htmlFor="image-src"><h4>Image Source</h4></label>
                                <input
                                    id="image-src"
                                    className="user-auth-form-input"
                                    type="text"
                                    placeholder="Image Source"
                                    value={imgSrc}
                                    onChange={(event) => setImgSrc(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="user-auth-input-container">
                                <label htmlFor="image-alt"><h4>Image Alt Text</h4></label>
                                <input
                                    id="image-alt"
                                    className="user-auth-form-input"
                                    type="text"
                                    placeholder="Image Alt Text"
                                    value={imgAlt}
                                    onChange={(event) => setImgAlt(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="user-auth-input-container">
                                <label htmlFor="badge-text"><h4>Badge Text</h4></label>
                                <input
                                    id="badge-text"
                                    className="user-auth-form-input"
                                    type="text"
                                    placeholder="Badge Text"
                                    value={badgeText}
                                    onChange={(event) => setBadgeText(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <div className="user-auth-input-container">
                                <label htmlFor="out-of-stock" className="out_of_stock_label"><h4>Out of Stock</h4></label>
                                <input
                                    id="out-of-stock"
                                    className="user-auth-form-input"
                                    type="checkbox"
                                    checked={outOfStock}
                                    onChange={(event) => setOutOfStock(event.target.checked)}
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="user-auth-input-container">
                                <label htmlFor="fast-delivery-available"><h4>Fast Delivery Available</h4></label>
                                <input
                                    id="fast-delivery-available"
                                    className="user-auth-form-input"
                                    type="checkbox"
                                    checked={fastDeliveryAvailable}
                                    onChange={(event) => setFastDeliveryAvailable(event.target.checked)}
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="user-auth-input-container">
                                <label htmlFor="genre"><h4>Genre</h4></label>
                                <input
                                    id="genre"
                                    className="user-auth-form-input"
                                    type="text"
                                    placeholder="Genre"
                                    value={genre}
                                    onChange={(event) => setGenre(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div className="user-auth-input-container">
                                <label htmlFor="rating"><h4>Rating</h4></label>
                                <input
                                    id="rating"
                                    className="user-auth-form-input"
                                    type="number"
                                    placeholder="Rating"
                                    value={rating}
                                    onChange={(event) => setRating(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="user-auth-input-container">
                                <label htmlFor="description"><h4>Description</h4></label>
                                <textarea
                                    id="description"
                                    className="user-auth-form-input"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
























                    <button
                        type="submit"
                        className="solid-success-btn add-book-form-submit-btn"
                    >
                        Add Book
                    </button>
                </form>
            </div>
        </>
    );
}

export { AddBook };