import { convertToVND, convertToVNDDB } from "../../../../utils/FormatMoney";
import "./roomCard.css";
import { Link } from "react-router-dom";

const RoomCard = ({
  img,
  roomSize,
  priceOneNight,
  onBook,
  typeRoom,
  amenities,
}) => {
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
              <span>{convertToVNDDB(priceOneNight)} / 1 đêm</span>
            </div>
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
