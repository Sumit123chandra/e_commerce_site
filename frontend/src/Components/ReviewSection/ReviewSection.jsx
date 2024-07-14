import React, { useState, useEffect, useContext } from 'react';
import './ReviewSection.css'
import { ShopContext } from '../../Context/ShopContext';

const ReviewSection = ({ productId }) => {
    const { user,addReview } = useContext(ShopContext);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        rating: 0,
        comment: ''
    });
/*
    useEffect(() => {
        fetch(`http://localhost:4000/reviews/${productId}`)
            .then(response => response.json())
            .then(data => setReviews(data))
            .catch(error => console.error('Error fetching reviews:', error));
    }, [productId]);*/
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:4000/reviews/${productId}`);
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
    
        fetchReviews();
    }, [productId]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview({ ...newReview, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            console.error("User not logged in");
            return;
        }

        const reviewData = {
            productId,
            username: user.name,
            rating: newReview.rating,
            comment: newReview.comment
        };
        console.log('Review Data:', reviewData); 

        try {
            await addReview(productId, reviewData);
            setReviews([...reviews, reviewData]);
            setNewReview({ rating: 0, comment: '' });
        } catch (error) {
            console.error('Error adding review:', error); 
        }
    };

    return (
        <div className="review-section">
            <h2>Reviews</h2>
            {reviews.length === 0 && <p>No reviews yet. Be the first to write a review!</p>}
            <ul>
                {reviews.map((review, index) => (
                    <li key={index}>
                        <strong>{review.username}</strong> rated it {review.rating} stars
                        <p>{review.comment}</p>
                    </li>
                ))}
            </ul>
            {user ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Rating:
                        <input
                            type="number"
                            name="rating"
                            value={newReview.rating}
                            onChange={handleInputChange}
                            min="1"
                            max="5"
                            required
                        />
                    </label>
                    <label>
                        Comment:
                        <textarea
                            name="comment"
                            value={newReview.comment}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <button type="submit">Submit Review</button>
                </form>
            ) : (
                <p>Please log in to write a review.</p>
            )}
        </div>
    );
};

export default ReviewSection;
