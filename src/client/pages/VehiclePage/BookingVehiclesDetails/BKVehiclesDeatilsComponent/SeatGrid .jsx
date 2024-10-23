import React from 'react';
import './SeatGrid.css';
import ChairIcon from '@mui/icons-material/Chair'; // Biểu tượng ghế từ Material-UI

const SeatGrid = ({ floorNumber, floorLabel }) => {
  const generateSeats = (prefix, count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `${prefix}${(i + 1).toString().padStart(2, '0')}`,
      status: Math.random() > 0.7 ? 'booked' : 'available'
    }));
  };

  const seats = generateSeats(floorNumber === 1 ? 'A' : 'B', 17);

  return (
    <div className="seat-grid-wrapper">
      <div className="first-row-container">
        <button className={`seat-button ${seats[0].status}`}>
          <ChairIcon style={{ color: seats[0].status === 'available' ? '#0C7FDA' : '#D9D9D9' }} />
          {seats[0].id}
        </button>
        <div className="floor-info-container">
          <span>{floorLabel}</span>
          <button className={`seat-button ${seats[1].status}`}>
            <ChairIcon style={{ color: seats[1].status === 'available' ? '#0C7FDA' : '#D9D9D9' }} />
            {seats[1].id}
          </button>
        </div>
      </div>

      {[2, 5, 8, 11, 14].map((startIdx, rowIdx) => (
        <div className="seat-row-container" key={rowIdx}>
          {seats.slice(startIdx, startIdx + 3).map((seat, idx) => (
            <button key={idx} className={`seat-button ${seat.status}`}>
              <ChairIcon style={{ color: seat.status === 'available' ? '#0C7FDA' : '#D9D9D9' }} />
              {seat.id}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatGrid;
