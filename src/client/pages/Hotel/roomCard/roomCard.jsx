import img1 from "../../../../assets/beach.jpg";
import img3 from "../../../../assets/beach.jpg";
import img5 from "../../../../assets/beach.jpg";
import "./roomCard.css";
import { Link, useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { convertToVND } from "../../../../utils/FormatMoney";

const RoomCard = ({
  img,
  roomSize,
  priceOneNight,
  onBook,
  typeRoom,
  amenities,
}) => {
  const navigate = useNavigate();

  // Define the openSnackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = (e) => {
    if (onBook) {
      onBook(e);
    } else {
      handleBookTicket(e);
    }
  };

  const handleBookTicket = () => {
    // onBook();
    setOpenSnackbar(true);
    setTimeout(() => navigate("/payment"), 1500);
  };

  return (
    <>
      <div className="flex-container-room-card">
        <div className="card-room-type align-items-center">
          <div className="d-flex align-items-center custom-img-room-type">
            <img style={{ width: "500px" }} src={img1} alt="" />
            <p className="content-type ms-3">Phòng đơn 1 người</p>
          </div>
          <div className="price-room-type text-end">
            <p className="amenities d-flex justify-content-center mt-3">
              <small>
                <i className="fa-solid fa-bowl-food"></i>Nước và đồ ăn
              </small>
              <small>
                <i className="fa-solid fa-wifi"></i>Wifi
              </small>
              <small>
                <i className="fa-solid fa-toilet-paper"></i>Dụng cụ vệ sinh
              </small>
            </p>
            <span>200.000 VNĐ / 1 đêm</span>
            <Link to="/hotel/booking">Đặt ngay</Link>
          </div>
        </div>
        <div className="card-room-type align-items-center">
          <div className="d-flex align-items-center custom-img-room-type">
            <img style={{ width: "100%" }} src={img3} alt="" />
            <p className="content-type ms-3">Phòng đôi 2 người</p>
          </div>
          <div className="price-room-type text-end">
            <p className="amenities d-flex justify-content-center mt-3">
              {amenities?.map((ha, index) => (
                <small key={index}>
                  <img
                    src={ha.icon?.url}
                    alt=""
                    width={"20px"}
                    height={"20px"}
                    style={{ marginRight: "5px" }}
                  />
                  {ha.name}
                </small>
              ))}
            </p>

            <div className="d-flex justify-content-between">
              <span>Loại phòng: {typeRoom}</span>
              <span>{convertToVND(priceOneNight)} / 1 đêm</span>
            </div>
            <button
              type="button"
              className="book-ticket-transport"
              onClick={handleClick}
            >
              Đặt ngay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
