import React from 'react';

function BookingHotelStarRating({ rating, reviewCount }) {
    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => (
                <img
                    key={index}
                    src={`http://b.io/ext_${index + 6}-`} // Ensure the URL is valid
                    alt={index < rating ? "Filled star" : "Empty star"}
                    className="star-icon"
                />
            ))}
            <span className="review-count">( {reviewCount}+ )</span>
            <style jsx>{`
        .star-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-top: 14px;
        }
        .star-icon {
          width: 15px;
          height: 15px;
        }
        .review-count {
          color: #999;
          font-size: 10px;
          font-weight: 600;
        }
      `}</style>
        </div>
    );
}

export default BookingHotelStarRating;
