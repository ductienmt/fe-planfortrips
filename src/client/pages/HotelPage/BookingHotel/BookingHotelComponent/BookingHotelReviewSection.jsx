import React from 'react';
import BookingHotelStarRating from './BookingHotelStarRating';
import './BookingHotelReviewSection.css'; //

function BookingHotelReviewSection() {
  const reviews = [
    { name: "Huỳnh Anh Quân", rating: 5, comment: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati similique debitis facilis, deleniti nostrum aperiam molestias repellendus exercitationem fugit ipsam sint?" },
    { name: "Nguyễn Văn A", rating: 4, comment: "Dịch vụ tốt, sẽ quay lại lần sau." },
    { name: "Trần Thị B", rating: 2, comment: "Chất lượng không như mong đợi." },
  ];

  return (
    <div className="booking-hotel-review-container">
      <section className="booking-hotel-review-section">
        <div className="booking-hotel-review-header">
          <h2 className="booking-hotel-section-title">Đánh giá</h2>
          <span className="booking-hotel-review-count">( hơn 45 đánh giá)</span>
          <button className="booking-hotel-add-review-button">Thêm đánh giá</button>
        </div>
        <div className="booking-hotel-review-summary">
          <div className="booking-hotel-overall-rating">
            <span className="booking-hotel-rating-number">5.0</span> trên 5.0
          </div>
          <div className="booking-hotel-rating-filters">
            <button className="booking-hotel-filter-button active">Tất cả</button>
            <button className="booking-hotel-filter-button">5 sao</button>
            <button className="booking-hotel-filter-button">4 sao</button>
            <button className="booking-hotel-filter-button">3 sao</button>
            <button className="booking-hotel-filter-button">2 sao</button>
            <button className="booking-hotel-filter-button">1 sao</button>
          </div>
        </div>
        <div className="booking-hotel-review-list">
          {reviews.map((review, index) => (
            <div key={index} className="booking-hotel-review-item">
              <BookingHotelStarRating rating={review.rating} />
              <h3 className="booking-hotel-reviewer-name">{review.name}</h3>
              <p className="booking-hotel-review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BookingHotelReviewSection;
