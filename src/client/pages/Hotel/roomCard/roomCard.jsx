import { convertToVND } from "../../../../utils/FormatMoney";
import "./roomCard.css";
import { Link } from "react-router-dom";

const RoomCard = ({ img, roomSize, priceOneNight, onBook }) => {
  return (
    <>
      <div className="flex-container-room-card">



        <div className="card-room-type align-items-center">
          <div className="d-flex align-items-center custom-img-room-type">
            <img style={{ width: "500px" }} src={img} alt="" />
            <p className="content-type ms-3">{roomSize}</p>
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
            <span>{convertToVND(priceOneNight)} / 1 đêm</span>
            <button
              type="button"
              className="book-ticket-transport"
              // data-bs-toggle="modal"
              // data-bs-target="#bookingRoomModal"
              onClick={onBook}
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
