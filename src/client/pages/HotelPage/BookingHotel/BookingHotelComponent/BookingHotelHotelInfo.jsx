import React from 'react';
import BookingHotelStarRating from './BookingHotelStarRating';
import './BookingHotelHotelInfo.css'; // Import file CSS riêng

function BookingHotelHotelInfo() {
  return (
    <section className="booking-hotel-hotel-info-container">
      <div className="booking-hotel-hotel-details">
        <h1 className="booking-hotel-name">Khách sạn Mường Thanh</h1>
        <p className="booking-hotel-address">Địa chỉ: 086, Đường Thanh Niên, thành phố Lào Cai, Việt Nam</p>
        <BookingHotelStarRating rating={5} reviewCount={1000} />
      </div>
      <div className="booking-hotel-info">
        <div className="booking-hotel-price-info">
          <p className="booking-hotel-original-price">Giá gốc: <span>3,690,000đ</span></p>
          <p className="booking-hotel-discounted-price">Giá sau giảm: <span>1,750,000đ</span></p>
          <p className="booking-hotel-tax-info">( Đã bao gồm thuế, phí )</p>
        </div>
        <button className="booking-hotel-book-button">Đặt phòng</button>
      </div>
    </section>
  );
}

export default BookingHotelHotelInfo;
