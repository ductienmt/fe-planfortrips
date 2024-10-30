import React from 'react';
import BookingHotelStarRating from './BookingHotelStarRating';
import './BookingHotelHotelInfo.css'; // Import file CSS riêng
import { Link } from 'react-router-dom';

function BookingHotelHotelInfo({hotelInfo}) {
  return (
    <section className="booking-hotel-hotel-info-container">
      <div className="booking-hotel-hotel-details">
        <h1 className="booking-hotel-name">{hotelInfo.roomName}</h1>
        {/* <p className="booking-hotel-address">Địa chỉ: {hotelInfo.hotel.address}</p> */}
        <BookingHotelStarRating rating={hotelInfo.rating} reviewCount={1000} />
      </div>
      <div className="booking-hotel-info">
        <div className="booking-hotel-price-info">
          <p className="booking-hotel-discounted-price">Giá : <span>{hotelInfo.price}</span></p>
          <p className="booking-hotel-tax-info">( Đã bao gồm thuế, phí )</p>
        </div>
        <Link to={`/hotel-info/${hotelInfo.id}`}>
       <button className="booking-hotel-book-button">Đặt phòng</button>
       </Link>
      </div>
    </section>
  );
}

export default BookingHotelHotelInfo;
