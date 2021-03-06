import React from 'react';

function Rating({ rating }) {
    return (
        <div className="rating" style={{ color: "#ff523b" }}>
            <i className={rating >= 1 ? 'fas fa-star' : rating >= 0.5 ? 'far fa-star-half-alt' : 'far fa-star'}></i>
            <i className={rating >= 2 ? 'fas fa-star' : rating >= 1.5 ? 'far fa-star-half-alt' : 'far fa-star'}></i>
            <i className={rating >= 3 ? 'fas fa-star' : rating >= 2.5 ? 'far fa-star-half-alt' : 'far fa-star'}></i>
            <i className={rating >= 4 ? 'fas fa-star' : rating >= 3.5 ? 'far fa-star-half-alt' : 'far fa-star'}></i>
            <i className={rating >= 5 ? 'fas fa-star' : rating >= 4.5 ? 'far fa-star-half-alt' : 'far fa-star'}></i>
        </div>
    );
}

export default Rating;
