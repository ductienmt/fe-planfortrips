import React from 'react';
import './AccommodationCard.css';

const AccommodationCard = ({ image, name, address, amenities, rating, reviews, originalPrice, discountedPrice }) => {
    return (
        <article className="accommodation-card-outer-container">
            <div className="accommodation-card-main-content-container">
                <img src={image} alt={name} className="accommodation-card-image" />
                <div className="accommodation-card-details-section-container">
                    <h3 className="accommodation-card-name-text">{name}</h3>
                    <p className="accommodation-card-address-text">{address}</p>
                    <h4 className="accommodation-card-amenities-heading">Tiện nghi</h4>
                    <ul className="accommodation-card-amenities-list-container">
                        {amenities.map((amenity, index) => (
                            <li key={index} className="accommodation-card-amenity-item">{amenity}</li>
                        ))}
                    </ul>
                    <center>
                        <div className="accommodation-card-divider-line"></div>
                    </center>
                    <div className="accommodation-card-rating-and-reviews-container">
                        <h4 className="accommodation-card-rating-heading">Đánh giá</h4>
                        <div className="accommodation-card-rating-stars-container">
                            {[...Array(rating)].map((_, i) => (
                                <img key={i} src={`http://b.io/ext_${14 + i}-`} alt="" className="accommodation-card-star-icon" />
                            ))}
                        </div>
                        <span className="accommodation-card-review-count-text">( {reviews} )</span>
                    </div>
                    <div className="accommodation-card-partnership-badge-container">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/10bffa496ab9762efa950ac78c9a0dcb74f09c1ae79301bf2f72e7fd08c918f6?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="" className="accommodation-card-partnership-icon" />
                        <span className="accommodation-card-partnership-text">Quan hệ đối tác</span>
                    </div>
                    <div className="accommodation-card-price-information-container">
                        <div className="accommodation-card-original-price-container">
                            <span className="accommodation-card-price-label-text">Giá gốc</span>
                            <span className="accommodation-card-original-price-value">{originalPrice.toLocaleString()}</span>
                            <span className="accommodation-card-currency-symbol">đ</span>
                        </div>
                        <div className="accommodation-card-discounted-price-container">
                            <span className="accommodation-card-price-label-text">( Đã bao gồm thuế, phí )</span>
                            <span className="accommodation-card-discounted-price-value">{discountedPrice.toLocaleString()}</span>
                            <span className="accommodation-card-currency-symbol">đ</span>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default AccommodationCard;
