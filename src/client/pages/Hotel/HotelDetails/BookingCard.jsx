import React from 'react';
import "./styles.css"
const BookingCard = () => {
    return (
        <div className="booking-card">
            <div className="rating-section">
                <div className="rating-stars">
                    <h3 className="rating-text">Đánh giá</h3>
                    <div className="star-rating">
                        {[1, 2, 3, 4].map((star) => (
                            <img key={star} loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/119fa1d6ffb48f76e86003d83e5041fe67f676aa0816f616c54aa4930b8bd910?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="Star" className="star-icon" />
                        ))}
                    </div>
                </div>
                <span className="rating-count">( 1k+)</span>
            </div>
            <a href="#" className="read-reviews">Đọc mọi đánh giá</a>
            <div className="price-section">
                <span className="price-label">Giá gốc:</span>
                <span className="original-price">3,690,000đ</span>
            </div>
            <div className="discounted-price-section">
                <span className="discounted-price-label">Giá sau giảm:</span>
                <span className="discounted-price">1,750,000đ</span>
            </div>
            <p className="price-note">( Đã bao gồm thuế, phí )</p>
            <div className="hotel-tag">
                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/85b3c6ec8ee78b380f183c2fec78b816912450f438d097d8005e0d71559e09d4?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" className="tag-icon" />
                <span className="tag-text">Khách sạn giá tốt</span>
            </div>
            <button className="book-now-button">Đặt phòng ngay</button>
        </div>
    );
};

export default BookingCard;