import React from "react";
import "./Failed.css";

const Failed = () => {
  return (
    <>
      <div className={`payment-status failure`}>
        <div className="payment-status-container">
          <div className="payment-status-icon">
            <i className="fas fa-times-circle"></i>
          </div>
          <h1>Thanh toán thất bại!</h1>
          {/* <p>{message}</p> */}
          <button className="btn">Thử lại</button>
        </div>
      </div>
    </>
  );
};

export default Failed;
