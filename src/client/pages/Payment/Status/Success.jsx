import React, { useEffect } from "react";
import "./Succes.css";
import { Link } from "react-router-dom";
const Success = () => {
  return (
    <>
      <div className={`payment-status success`}>
        <div className="payment-status-container">
          <div className="payment-status-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <h1>Thanh toán thành công!</h1>
          {/* <p>{message}</p> */}
          <Link className="btn" to={"/"}>
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
