import React from 'react';
import "./HotelAmenities.css"

const HotelAmenitiesFullContainer = () => {
    const amenities = [
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a43d5397fbca9b2e29fefa7d5837289c51afbc88ed0e84b6666f10ba4b1b8508?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Spa" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a43d5397fbca9b2e29fefa7d5837289c51afbc88ed0e84b6666f10ba4b1b8508?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Gym" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a43d5397fbca9b2e29fefa7d5837289c51afbc88ed0e84b6666f10ba4b1b8508?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Nhà hàng" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a43d5397fbca9b2e29fefa7d5837289c51afbc88ed0e84b6666f10ba4b1b8508?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Hồ bơi" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fe5cff4dd112e06197ba07000814fa9157a99ac312d0f6444e579780c28003b4?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Vận chuyển vali" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a43d5397fbca9b2e29fefa7d5837289c51afbc88ed0e84b6666f10ba4b1b8508?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8", text: "Bãi giữ xe" },
    ];

    return (
        <div className="hotel-amenities-full-container">
            <h3 className="hotel-amenities-title-header">Tiện nghi khách sạn</h3>
            <div className="hotel-amenities-grid-layout">
                {[0, 1, 2].map((columnIndex) => (
                    <div key={columnIndex} className="hotel-amenities-column-layout">
                        <div className="hotel-amenities-list-layout">
                            {amenities.slice(columnIndex * 2, columnIndex * 2 + 2).map((amenity, index) => (
                                <div key={index} className="hotel-amenity-item-layout">
                                    <img loading="lazy" src={amenity.icon} alt={amenity.text} className="hotel-amenity-icon-layout" />
                                    <span>{amenity.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HotelAmenitiesFullContainer;