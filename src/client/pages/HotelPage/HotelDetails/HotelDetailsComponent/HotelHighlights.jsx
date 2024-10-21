import React from 'react';
import "./HotelHighlights.css";

const HotelHighlights = () => {
    const highlights = [
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6715c8f352bc0c2fdf8c7616e5e5a68798ca31411fa8419f72331f71850946fd?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Check-in 24h" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/826d325a173d0184f5818923359bfbfb25132b80f1fbe16995a0f685410afdb6?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Hồ bơi" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/d1bdf447a926ff606ee2893bac7ac9aed9c62a8ab2da91464c164b05e560c2f6?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Wifi miễn phí" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/f8721c397800286b485f795050798d401fa5a8784b8076fb128a9db554f2204d?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Mini bar" },
    ];

    return (
        <div className="hotel-highlights-container-wrapper">
            <div className="hotel-highlights-container-content">
                {highlights.map((highlight, index) => (
                    <div key={index} className="hotel-highlight-item-container">
                        <img loading="lazy" src={highlight.icon} alt={highlight.text} className="hotel-highlight-item-icon" />
                        <p className="hotel-highlight-item-text">{highlight.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelHighlights;
