import { convertToVND, convertToVNDDB } from "../../../../utils/FormatMoney";
import "./RoomCard.css";
import { Link } from "react-router-dom";

const RoomCard = ({
  img,
  roomSize,
  roomName,
  priceOneNight,
  onBook,
  typeRoom,
  amenities,
}) => {
  return (
    <>
      <div className="flex-container-room-cardd components-card-room-custom-plan">
        <div className="card-room-typee align-items-center">
          <div
            className="d-flex align-items-center custom-img-room-typee"
            style={{
              maxWidth: "650px",
              width: "100%",
              height: "200px",
            }}
          >
            <img
              src={img}
              alt=""
              style={{
                width: "85%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px 0 0 10px",
              }}
            />
            <p className="content-type ms-3" style={{ width: "150px" }}>
              Phòng {roomName} <br />
              <span
                style={{ fontSize: "15px", fontStyle: "italic", color: "#ccc" }}
              >
                sức chứa {roomSize}
              </span>
            </p>
          </div>
          <div className="price-room-typee text-end">
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

            <div
              className="d-flex justify-content-between"
              style={{ gap: "20px" }}
            >
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
