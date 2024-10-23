import React, { useState } from 'react';
import './BookingHotelRoomOptions.css';

function BookingHotelRoomOptions() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = [
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ac8292497f64c74b532d6b7d2dd1d5fe04e98b3a6c37b4972fa0ff7c4c1f2b8f?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
      capacity: "Giới hạn: 1 người",
      price: "750,000đ / đêm"
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/005c6759c126cf537ca94af2698983de0d0a60752bb3435d050b52c3811d68b9?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
      capacity: "Giới hạn: 2 người",
      price: "950,000đ / đêm"
    },
    {
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/ad1249466ab09c450af471f876ae44c5ad0a2ba87835a0c5b810e59c882724c9?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8",
      capacity: "Giới hạn: 2 người lớn, 1-2 trẻ em từ 3-7 tuổi",
      price: "1,050,000đ / đêm"
    }
  ];

  return (
    <section className="booking-hotel-room-options-container">
      <h2 className="section-title-room-options">Phòng hiện có</h2>
      <div className="room-options-wrapper">
        {rooms.map((room, index) => (
          <div key={index} className="room-option-card">
            <img src={room.image} alt={`Room option ${index + 1}`} className="room-image-thumbnail" />
            <div className="room-details-container">
              <p className="room-capacity-description">{room.capacity}</p>
              <p className="room-amenities-description">Bao gồm tất cả tiện ích</p>
            </div>
            <div className="room-price-container">
              <button
                className={`circle-button ${selectedRoom === index ? 'selected' : ''}`}
                onClick={() => setSelectedRoom(index)}
              ></button>
              <span className="price-label-description">Từ</span>
              <span className="price-amount-description">{room.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BookingHotelRoomOptions;
