import React from 'react';
import './BusResultItem.css';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BusResultItem = ({ departureTime, arrivalTime, company, rating, type, price, seatsAvailable }) => {
  return (
    <article className="bus-result-item-container-wrapper">
      <div className="bus-result-trip-info-container">
        <div className="bus-result-time-info-container">
          <span className="bus-result-departure-time">{departureTime}</span>
          <div className="bus-result-company-info-container">
            <span className="bus-result-company-name">{company}</span>
            <div className="bus-result-rating-container">
              <StarIcon style={{ color: '#ffb400' }} />
              <span>{rating}/5</span>
            </div>
          </div>
          <span className="bus-result-type">{type}</span>
          <span className="bus-result-voucher-tag">voucher +</span>
        </div>
        <div className="bus-result-trip-duration-container">
          <span>3h00</span>
          <ArrowForwardIcon />
          <span>144km</span>
        </div>
        <span className="bus-result-arrival-time">{arrivalTime}</span>
      </div>
      <div className="bus-result-booking-info-container">
        <div className="bus-result-price-info-container">
          <span className="bus-result-price">{price}</span>
          <span className="bus-result-seats-available">Còn {seatsAvailable} chỗ</span>
          <div className="bus-result-select-seat-button" tabIndex="0" role="button" aria-label="Select seat" />
        </div>
        <button className="bus-result-book-button">Đặt vé ngay</button>
      </div>
    </article>
  );
};

export default BusResultItem;
