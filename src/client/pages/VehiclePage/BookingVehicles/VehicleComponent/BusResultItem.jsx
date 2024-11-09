import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BusResultItem.css';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const BusResultItem = ({ id, departureTime, arrivalTime, carCompanyName, carCompanyRating, type, price, countSeatsEmpty }) => {
  const navigate = useNavigate();

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };


  const handleBookNow = () => {
    navigate(`/vehicle-details/${id}`);
  };

  return (
    <article className="bus-result-item-container-wrapper">
      <div className="bus-result-trip-info-container">
        <div className="bus-result-time-info-container">
          <span className="bus-result-departure-time">{formatTime(departureTime)}</span>
          <div className="bus-result-company-info-container">
            <span className="bus-result-company-name">{carCompanyName}</span>
            <div className="bus-result-rating-container">
              <StarIcon style={{ color: '#ffb400' }} />
              <span>{carCompanyRating}/5</span>
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
        <span className="bus-result-arrival-time">{formatTime(arrivalTime)}</span>
      </div>
      <div className="bus-result-booking-info-container">
        <div className="bus-result-price-info-container">
          <span className="bus-result-price">{price}</span>
          <span className="bus-result-seats-available">Còn {countSeatsEmpty} chỗ</span>
          <div className="bus-result-select-seat-icon">
            <ErrorOutlineIcon style={{ color: '#fff', fontSize: '24px' }} />
          </div>
        </div>

        <button className="bus-result-book-button" onClick={handleBookNow}>Đặt vé ngay</button>
      </div>
    </article>
  );
};

export default BusResultItem;
