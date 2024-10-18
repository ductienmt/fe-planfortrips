import React from 'react';
import "./styles.css"

const SimilarHotels = () => {
    return (
        <>
            <h2 className="similar-hotels-title">Gợi ý chỗ ở tương tự</h2>
            <div className="similar-hotel-card">
                <div className="similar-hotel-content">
                    <div className="similar-hotel-image-column">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/08227c21617880b14c91102736d92e3251a684629cf8ddc4442fd3a916094507?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="Similar hotel" className="similar-hotel-image" />
                    </div>
                    <div className="similar-hotel-info-column">
                        <div className="similar-hotel-info">
                            <div className="similar-hotel-header">
                                <div className="similar-hotel-details">
                                    <p className="similar-hotel-address">Địa chỉ: 74 ĐL Trần Hưng Đạo, Bắc Cường, Lào Cai</p>
                                    <h4 className="similar-hotel-amenities-title">Tiện nghi</h4>
                                    <div className="similar-hotel-amenities">
                                        <div className="similar-hotel-amenities-list">
                                            <span>Ăn sáng</span>
                                            <span>Free Wifi</span>
                                            <span>+2</span>
                                        </div>
                                        <span>Gym</span>
                                    </div>
                                </div>
                                <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0569f9bb0bf09d949f1efffc99034bdd173b7db59325b1fa4ffad7d54434a363?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="Partnership" className="partnership-icon" />
                                <div className="similar-hotel-rating">
                                    <div className="similar-hotel-rating-header">
                                        <h4 className="similar-hotel-rating-title">Đánh giá</h4>
                                        <div className="similar-hotel-rating-stars">
                                            <div className="similar-hotel-stars">
                                                {[1, 2, 3, 4].map((star) => (
                                                    <img key={star} loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/9946e2e22139d1699e68649891687f39250c0d0d3a59fa47cd851ced2fc622ef?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="Star" className="similar-hotel-star" />
                                                ))}
                                            </div>
                                            <span className="similar-hotel-review-count">( 1k+)</span>
                                        </div>
                                    </div>
                                    <div className="similar-hotel-partnership">
                                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/6d03fb5ae294c1cd32f46416c7c5481b7ef647b5787c5509b76a7901e7502a8f?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8" alt="Partnership" className="partnership-icon" />
                                        <span className="partnership-text">Quan hệ đối tác</span>
                                    </div>
                                    <div className="similar-hotel-price">
                                        <div className="similar-hotel-price-details">
                                            <span className="similar-hotel-price-label">Giá gốc</span>
                                            <span className="similar-hotel-original-price">5,900,000</span>
                                        </div>
                                        <span className="similar-hotel-currency">đ</span>
                                    </div>
                                </div>
                            </div>
                            <div className="similar-hotel-price-footer">
                                <p className="similar-hotel-price-note">( Đã bao gồm thuế, phí )</p>
                                <div className="similar-hotel-discounted-price">
                                    <span className="discounted-price-value">2,999,000</span>
                                    <span className="discounted-price-currency">đ</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SimilarHotels;