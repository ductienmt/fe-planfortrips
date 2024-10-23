import React, { useState } from "react";
import "./BookingHotelRoomOptions.css";

function BookingHotelRoomOptions({ rooms, setRoom }) {
  const [selectedRoom, setSelectedRoom] = useState(0);

  const scrollToBookingContainer = () => {
    const bookingContainer = document.querySelector(".booking-hotel-container");
    if (bookingContainer) {
      bookingContainer.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="booking-hotel-room-options-container">
      <h2 className="section-title-room-options">Phòng hiện có</h2>
      <div className="room-options-wrapper">
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room, index) => (
            <div key={index} className="room-option-card">
              <img
                src={room.images[0]}
                alt={`Room option ${index + 1}`}
                className="room-image-thumbnail"
              />
              <div className="room-details-container">
                <p className="room-capacity-description">
                  Sức chứa tối đa : {room.maxSize}
                </p>
                <p className="room-amenities-description">
                  Bao gồm tất cả tiện ích
                </p>
              </div>
              <div className="room-price-container">
                <button
                  className={`circle-button ${
                    selectedRoom === index ? "selected" : ""
                  }`}
                  onClick={() => {
                    setSelectedRoom(index);
                    setRoom(room);
                    scrollToBookingContainer(); // Call the scroll function directly
                  }}
                ></button>
                <span className="price-label-description">Từ</span>
                <span className="price-amount-description">{room.price}</span>
              </div>
            </div>
          ))
        ) : (
          <p>Không có phòng nào còn trống</p>
        )}
      </div>
    </section>
  );
}

export default BookingHotelRoomOptions;
