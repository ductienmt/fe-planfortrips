import { useState } from "react";
import { Star } from "../../../../admin/pages/Components/Star";

const ratingList = [1, 2, 3, 4, 5];

const RatingCheckboxGroup = ({ setSelectedRating }) => {
  const [selectedRating, setSelectedRatingState] = useState(null);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      const rating = parseInt(name, 10);
      setSelectedRatingState(rating);
      setSelectedRating(rating);
      console.log(rating);
      
    } else {
      setSelectedRatingState(null);
      setSelectedRating(null);
    }
  };

  return (
    <div>
      {ratingList.map((rating) => (
        <div key={rating} className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id={`rating-${rating}`}
            name={rating}
            checked={selectedRating === rating}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={`rating-${rating}`} className="form-check-label">
            <Star rating={rating} />
          </label>
        </div>
      ))}
    </div>
  );
};

export default RatingCheckboxGroup;