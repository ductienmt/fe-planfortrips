import React from 'react';
import './LegendStatus.css';

const LegendStatus = () => {
  const statuses = [
    { color: '#D9D9D9', label: 'Đã đặt' },
    { color: '#0C7FDA', label: 'Đang chọn' },
    { color: '#FFFFFF', label: 'Chưa đặt', border: true }
  ];

  return (
    <div className="legend-wrapper">
      {statuses.map((status, index) => (
        <div className="status-item" key={index}>
          <div className="status-box" style={{ backgroundColor: status.color, border: status.border ? '1px solid #1891E8' : 'none' }} />
          <span className="status-label">{status.label}</span>
        </div>
      ))}
    </div>
  );
};

export default LegendStatus;
