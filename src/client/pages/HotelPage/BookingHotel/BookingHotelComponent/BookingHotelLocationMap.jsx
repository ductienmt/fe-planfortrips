import React from 'react';
import './BookingHotelLocationMap.css'; // Import file CSS riêng

function BookingHotelLocationMap() {
  return (
    <section className="booking-hotel-location-map">
      <h2 className="booking-hotel-section-title">Vị trí</h2>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d499c0490a4f2d740bad90f3e527489be183fa8285b52c818e51da338538669?placeholderIfAbsent=true&apiKey=c589bfd2cd264978bf52e7f54b2517b8"
        alt="Hotel location map"
        className="booking-hotel-map-image"
      />
    </section>
  );
}

export default BookingHotelLocationMap;
