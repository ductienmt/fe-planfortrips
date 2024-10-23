import React from 'react';
import './StepIndicator.css';

const StepIndicator = ({ number, label, active }) => {
  return (
    <div className="step-indicator-wrapper">
      <div className={`step-number-container ${active ? 'active' : 'inactive'}`}>
        {number}
      </div>
      <div className={`step-label-container ${active ? 'active' : 'inactive'}`}>
        {label}
      </div>
    </div>
  );
};

export default StepIndicator;
