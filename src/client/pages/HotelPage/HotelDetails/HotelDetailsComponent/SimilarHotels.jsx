import React from 'react';
import "./SimilarHotels.css";

const SimilarHotels = () => {
    return (
        <div className="similar-hotels-container">
            <h2 className="similar-hotels-title">Gợi ý chỗ ở tương tự</h2>
            <div className="similar-hotels-card">
                <div className="similar-hotels-content">
                    <div className="similar-hotels-image-column">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/08227c21617880b14c91102736d92e3251a684629cf8ddc4442fd3a916094507?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="Similar hotel" className="similar-hotels-image" />
                    </div>
                    <div className="similar-hotels-info-column">
                        <div className="similar-hotels-info">
                            <div className="similar-hotels-header">
                                <div className="similar-hotels-details">
                                    <p className="similar-hotels-address">Địa chỉ: 74 ĐL Trần Hưng Đạo, Bắc Cường, Lào Cai</p>
                                    <h4 className="similar-hotels-amenities-title">Tiện nghi</h4>
                                    <div className="similar-hotels-amenities">
                                        <div className="similar-hotels-amenities-list">
                                            <span>Ăn sáng</span>
                                            <span>Free Wifi</span>
                                            <span>+2</span>
                                        </div>
                                        <span>Gym</span>
                                    </div>
                                </div>
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0569f9bb0bf09d949f1efffc99034bdd173b7db59325b1fa4ffad7d54434a363?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="Partnership" className="partnership-icon" />
                                <div className="similar-hotels-rating">
                                    <div className="similar-hotels-rating-header">
                                        <h4 className="similar-hotels-rating-title">Đánh giá</h4>
                                        <div className="similar-hotels-rating-stars">
                                            <div className="similar-hotels-stars">
                                                {[1, 2, 3, 4].map((star) => (
                                                    <img key={star} loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9946e2e22139d1699e68649891687f39250c0d0d3a59fa47cd851ced2fc622ef?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="Star" className="similar-hotels-star" />
                                                ))}
                                            </div>
                                            <span className="similar-hotels-review-count">( 1k+)</span>
                                        </div>
                                    </div>
                                    <div className="similar-hotels-partnership">
                                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d03fb5ae294c1cd32f46416c7c5481b7ef647b5787c5509b76a7901e7502a8f?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="Partnership" className="partnership-icon" />
                                        <span className="partnership-text">Quan hệ đối tác</span>
                                    </div>
                                    <div className="similar-hotels-price">
                                        <div className="similar-hotels-price-details">
                                            <span className="similar-hotels-price-label">Giá gốc</span>
                                            <span className="similar-hotels-original-price">5,900,000</span>
                                        </div>
                                        <span className="similar-hotels-currency">đ</span>
                                    </div>
                                </div>
                            </div>
                            <div className="similar-hotels-price-footer">
                                <p className="similar-hotels-price-note">( Đã bao gồm thuế, phí )</p>
                                <div className="similar-hotels-discounted-price">
                                    <span className="discounted-price-value">2,999,000</span>
                                    <span className="discounted-price-currency">đ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimilarHotels;
