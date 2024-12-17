import React from "react";
import "./Seatscard.css";

const Seatscard = ({
  capacity,
  car_company,
  code,
  driverName,
  driverPhone,
  plateNumber,
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
    <div className="enterprise-Seatscard-container" style={{ width: "100%" }}>
      <article className="Seatscard-card">
        <div className="Seatscard-image">
          <img
            src={car_company.images[0]?.url}
            alt={`${car_company.id} exterior`}
            className="Seatscard-photo"
          />
        </div>
        <div className="Seatscard-info">
          <header className="Seatscard-header">
            <div className="Seatscard-title">
              <span className="Seatscard-code">Mã Xe: {code}</span>
              <div className="Seatscard-body">
                <h2 className="Seatscard-name">{car_company.name}</h2>
                {/* <span
                  className="Seatscard-status"
                  style={getStatusStyles(status)}
                >
                  {status}
                </span> */}
              </div>
            </div>
          </header>
          <p className="Seatscard-address">Biển số: {plateNumber}</p>
          <p className="Seatscard-phone">Sức chứa: {capacity} hành khách</p>
        </div>
        <div style={{ width: "250px" }}>
          <p className="Seatscard-phone">Tài xế: {driverName}</p>
          <p className="Seatscard-phone">Số điện thoại: {driverPhone}</p>
        </div>
      </article>
    </div>
  );
};

export default Seatscard;
