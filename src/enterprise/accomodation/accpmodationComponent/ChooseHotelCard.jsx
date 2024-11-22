import React, { useState } from "react";
import "./ChooseHotelCard.css";

const ChooseHotelCard = ({
  hotel_id,
  name,
  status,
  address,
  phoneNumber,
  images,
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
    <>
      <article className="chooseHotelCard-card">
        <div className="chooseHotelCard-image">
          <img
            src={images && images[0]?.url}
            alt={`${name} exterior`}
            className="chooseHotelCard-photo"
          />
        </div>
        <div className="chooseHotelCard-info">
          <header className="chooseHotelCard-header">
            <div className="chooseHotelCard-title">
              <span className="chooseHotelCard-code">
                Mã Khách Sạn: {hotel_id}
              </span>
              <div className="chooseHotelCard-body">
                <h2 className="chooseHotelCard-name">{name}</h2>
                <span
                  className="chooseHotelCard-status"
                  style={getStatusStyles(status)}
                >
                  {status}
                </span>
              </div>
            </div>
          </header>
          <p className="chooseHotelCard-address">{address}</p>
          <p className="chooseHotelCard-phone">Hotline: {phoneNumber}</p>
        </div>
      </article>
    </>
  );
};
export default ChooseHotelCard;
