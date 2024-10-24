import React from 'react';
import './BusInfo.css';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const BusInfo = () => {
  return (
    <article className="bus-info-container">
      <div className="bus-company-info-container">
        <div>
          <h2 className="bus-company-name">Phương Trang</h2>
          <p className="bus-type-info">Limousine</p>
        </div>
        <div className="bus-rating-container">
          <StarIcon style={{ color: '#FFD700' }} />
          <span>5/5</span>
        </div>
      </div>

      <a className="bus-info-link" href="#">Thông tin xe</a>

      <div className="bus-route-info-container">
        <span>Cao Lanh</span>
        <ArrowForwardIcon style={{ color: '#595959', fontSize: '15px' }} />
        <span>Hồ Chí Minh</span>
      </div>

      <p className="bus-schedule-info">02:00 - 05:00 CN, 06/10/2024</p>
    </article>
  );
};

export default BusInfo;
