import React from 'react';
import './BookingHotelAmenityItem.css'; // Import file CSS riêng

function BookingHotelAmenityItem({ icon, name }) {
  return (
    <div className="booking-hotel-amenity-item-container">
      <div className="booking-hotel-amenity-item">
        <img src={icon} alt={name} className="booking-hotel-amenity-icon" />
        <span className="booking-hotel-amenity-name">{name}</span>
      </div>
    </div>
  );
}

export default BookingHotelAmenityItem;
