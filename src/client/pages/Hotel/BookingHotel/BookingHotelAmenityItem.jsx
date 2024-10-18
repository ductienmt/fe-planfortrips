import React from 'react';

function BookingHotelAmenityItem({ icon, name }) {
    return (
        <div className="amenity-item">
            <img src={icon} alt={name} className="amenity-icon" />
            <span className="amenity-name">{name}</span>
            <style jsx>{`
        .amenity-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .amenity-icon {
          width: 24px;
          height: 24px;
          object-fit: contain;
        }
        .amenity-name {
          color: #2a2a2e;
          font-size: 14px;
        }
      `}</style>
        </div>
    );
}

export default BookingHotelAmenityItem;
