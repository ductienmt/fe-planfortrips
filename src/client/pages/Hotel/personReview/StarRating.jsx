import React, { useState } from 'react';

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRatingChange = (currentRating) => {
    setRating(currentRating);
    if (onRatingChange) {
      onRatingChange(currentRating);
    }
  };

  return (
    <div className="star-rating d-flex align-items-center">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index} className="star-label">
            <input 
              type="radio" 
              name="rating" 
              value={currentRating}
              className="d-none" 
              onChange={() => handleRatingChange(currentRating)}
            />
            <span 
              className="star"
              style={{
                color: currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9",
                fontSize: "2rem",
                cursor: "pointer",
                transition: "color 0.2s"
              }}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
      <span className="ms-2 text-muted">
        {rating > 0 ? `${rating} / 5` : "Chưa chọn sao"}
      </span>
    </div>
  );
};

export default StarRating;