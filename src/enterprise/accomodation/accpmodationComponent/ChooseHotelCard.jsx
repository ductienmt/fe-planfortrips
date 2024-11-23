import React, { useState } from "react";
import "./ChooseHotelCard.css";

const ChooseHotelCard = ({
  hotelId,
  hotelName,
  hotelStatus,
  hotelAddress,
  hotelPhoneNumber,
  hotelImages,
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
            src={hotelImages && hotelImages[0]?.url}
            alt={`${hotelName} exterior`}
            className="chooseHotelCard-photo"
          />
        </div>
        <div className="chooseHotelCard-info">
          <header className="chooseHotelCard-header">
            <div className="chooseHotelCard-title">
              <span className="chooseHotelCard-code">
                Mã Khách Sạn: {hotelId}
              </span>
              <div className="chooseHotelCard-body">
                <h2 className="chooseHotelCard-name">{hotelName}</h2>
                <span
                  className="chooseHotelCard-status"
                  style={getStatusStyles(hotelStatus)}
                >
                  {hotelStatus}
                </span>
              </div>
            </div>
          </header>
          <p className="chooseHotelCard-address">{hotelAddress}</p>
          <p className="chooseHotelCard-phone">Hotline: {hotelPhoneNumber}</p>
        </div>
      </article>
    </>
  );
};
export default ChooseHotelCard;
