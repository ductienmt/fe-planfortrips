import React, { useState } from "react";
import "./ChooseHotel.css";
import ChooseHotelCard from "../accpmodationComponent/ChooseHotelCard";
import { InputFlied } from "../../../client/Components/Input/InputFlied";
import { useNavigate } from "react-router-dom";

const ChooseHotel = () => {
  const navigate = useNavigate()
  const hotelmData = {
    hotelCode: "001",
    name: "City Center Hotel",
    status: "Đang hoạt động",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    phone: "0456123789",
    image: "/src/assets/beach.jpg",
  };

  const handleClick = () => {
    navigate("/enterprise/accomodation/room-management")
  }
  return (
    <>
      <div className="enterprise-chooseHotel-container">
        <div className="chooseHotel-title">
          <h1
            style={{
              fontSize: "30px",
              textTransform: "uppercase",
              color: "#ADADAD",
            }}
          >
            Chọn khách sạn
          </h1>
        </div>
        <div className="chooseHotel-content mt-3">
          <div className="nav-filterCombobox-chooseHotel">
            <InputFlied
              nameInput={"search"}
              content={"Tìm kiếm"}
              typeInput={"text"}
              dai={"31%"}
            />
          </div>
        </div>
        <div className="chooseHotel-selection">
          <div className="chooseHotel-container">
            <ChooseHotelCard {...hotelmData} />
            <button className="select-chooseHotel-btn" onClick={handleClick}>
              {/* Xử lý chuyển sang Room */}
              Chọn ngay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChooseHotel;
