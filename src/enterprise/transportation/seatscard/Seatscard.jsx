import React from "react";
import "./Seatscard.css";

const Seatscard = ({
  hotelCode,
  name,
  status,
  licensePlate,
  capacity,
  driverName,

  phone,
  image,
}) => {
  const getStatusStyles = (status) => {
    if (status === "Đang hoạt động") {
      return {
        backgroundColor: "#a6f6b5",
        color: "#07d02b",
      };
    } else if (status === "Ngưng hoạt động") {
      return {
        backgroundColor: "rgba(250, 15, 15, 0.1)",
        color: "#fa0f0f",
      };
    }
    return {}; // Trả về CSS mặc định nếu không khớp với các trạng thái trên
  };

  return (
    <div className="enterprise-Seatscard-container">
      <article className="Seatscard-card">
        <div className="Seatscard-image">
          <img
            src={image}
            alt={`${name} exterior`}
            className="Seatscard-photo"
          />
        </div>
        <div className="Seatscard-info">
          <header className="Seatscard-header">
            <div className="Seatscard-title">
              <span className="Seatscard-code">Mã Xe: {hotelCode}</span>
              <div className="Seatscard-body">
                <h2 className="Seatscard-name">{name}</h2>
                <span
                  className="Seatscard-status"
                  style={getStatusStyles(status)}
                >
                  {status}
                </span>
              </div>
            </div>
          </header>
          <p className="Seatscard-address">Biển số: {licensePlate}</p>
          <p className="Seatscard-phone">Sức chứa: {capacity}</p>
        </div>
        <div>
          <p className="Seatscard-phone">Tài xế: {driverName}</p>
          <p className="Seatscard-phone">sđt: {phone}</p>
        </div>
      </article>
    </div>
  );
};

export default Seatscard;
