import React from 'react';
import "./HotelDescription.css";

const HotelDescription = ({hotel}) => {
    return (
        <div className="hotel-description-container-wrapper">
            <div className="hotel-description-container-content">
                <div className="hotel-name-and-star-rating-container">
                    <h2 className="hotel-name-title">{hotel.name}</h2>
                    <div className="hotel-star-rating-container">
                        {[...Array(hotel.rating)].map((star) => (
                            <img
                                key={star}
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/359d68ff6db47925527305fd619fd5fea1f4b9a841fdb15e77d5236a1a8b7c53?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
                                alt="Star"
                                className="hotel-star-icon-image"
                            />
                        ))}
                    </div>
                </div>
                <p className="hotel-address-location-description">
                    Địa chỉ: {hotel.address}
                </p>
                <div className="hotel-description-separator-line" />
                <p className="hotel-full-description-text">
                    {hotel.description}
                </p>
            </div>
        </div>
    );
};

export default HotelDescription;
