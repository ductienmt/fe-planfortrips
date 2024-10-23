import React from 'react';
import './PickupPoints.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Biểu tượng dropdown từ Material-UI

const PickupPoints = () => {
  return (
    <section className="pickup-points-wrapper">
      <div className="pickup-points-container">
        <div className="pickup-point-container">
          <span>Chọn điểm đón</span>
          <ArrowDropDownIcon style={{ color: '#0c7fda', fontSize: '12px' }} />
        </div>

        <div className="dropoff-point-container">
          <ArrowDropDownIcon style={{ color: '#0c7fda', fontSize: '12px' }} />
          <span>Bến xe Miền Tây</span>
        </div>
      </div>
    </section>
  );
};

export default PickupPoints;
