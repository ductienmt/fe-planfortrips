import React from 'react';
import "./Bookingcard.css"; // Nhập tệp CSS

const BookingCard = () => {
    return (
        <div className="booking-card-container-wrapper">
            <div className="booking-card-content-area">
                <div className="booking-card-rating-section-area">
                    <div className="booking-card-rating-stars-display">
                        <h3 className="booking-card-rating-title-text">Đánh giá</h3>
                        <div className="booking-card-star-rating-display">
                            {[1, 2, 3, 4].map((star) => (
                                <img
                                    key={star}
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/119fa1d6ffb48f76e86003d83e5041fe67f676aa0816f616c54aa4930b8bd910?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
                                    alt="Star"
                                    className="booking-card-star-icon-image"
                                />
                            ))}
                        </div>
                    </div>
                    <span className="booking-card-rating-count-text">( 1k+)</span>
                </div>
                <a href="#" className="booking-card-read-reviews-link">Đọc mọi đánh giá</a>
                <div className="booking-card-price-section-area">
                    <span className="booking-card-price-label-text">Giá gốc:</span>
                    <span className="booking-card-original-price-text">3,690,000đ</span>
                </div>
                <div className="booking-card-discounted-price-section-area">
                    <span className="booking-card-discounted-price-label-text">Giá sau giảm:</span>
                    <span className="booking-card-discounted-price-text">1,750,000đ</span>
                </div>
                <p className="booking-card-price-note-text">( Đã bao gồm thuế, phí )</p>
                <div className="booking-card-hotel-tag-section">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/85b3c6ec8ee78b380f183c2fec78b816912450f438d097d8005e0d71559e09d4?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
                        alt=""
                        className="booking-card-tag-icon-image"
                    />
                    <span className="booking-card-tag-text-description">Khách sạn giá tốt</span>
                </div>
                <button className="booking-card-book-now-button-action">Đặt phòng ngay</button>
            </div>
        </div>
    );
};

export default BookingCard;
