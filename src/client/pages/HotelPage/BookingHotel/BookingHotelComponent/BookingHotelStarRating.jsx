import React from 'react';
import './BookingHotelStarRating.css'; // Đảm bảo rằng bạn đã tạo file CSS này

function BookingHotelStarRating({ rating, reviewCount }) {
  return (
    <div className="booking-hotel-star-rating-container">
      {[...Array(5)].map((_, index) => (
        <img
          key={index}
          src={`https://cdn.builder.io/api/v1/image/assets/TEMP/359d68ff6db47925527305fd619fd5fea1f4b9a841fdb15e77d5236a1a8b7c53?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8${index + 6}-`} // Đảm bảo URL là hợp lệ
          alt={index < rating ? "Filled star" : "Empty star"}
          className="booking-hotel-star-icon"
        />
      ))}
      <span className="booking-hotel-review-count">({reviewCount}+)</span>
    </div>
  );
}

export default BookingHotelStarRating;
