import "./roomCard.css";
import { Snackbar, Alert, Tooltip, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { RoomService } from "../../../../services/apis/RoomService";
import SvgIcon from "../card/svgIcon";
import { regexUrlIcon } from "../../../../utils/regex";
import { Image } from "antd";
import NotesIcon from "@mui/icons-material/Notes";
const RoomCard = ({ room_id,setSelectedRoom,selectedRoom}) => {
  const [room, setRoom] = useState({});

  const handleBookTicket = () => {
    const isRoomAlreadySelected = selectedRoom.find(selected => selected.id === room.id);
    if(!isRoomAlreadySelected){
      setSelectedRoom([...selectedRoom, room])
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await RoomService.findRoomById(room_id);
      if (response) {
        setRoom(response);
      }
    };
    fetch();
  }, room_id);
  const convertToVNDDB = (price) => {
    return price + ".000VND ";
  };
  return (
    <>
      <div className="flex-container-room-card">
        <div className="card-room-type align-items-center">
          <div className="d-flex align-items-center custom-img-room-type">
            <Image
              src={
                room?.images?.length > 0
                  ? room.images[0]?.url
                  : "../src/assets/imageRoomNotExist.jpeg"
              }
              alt="Room Image"
            />
          </div>
          <div className="bg-room-description" style={{ height: "auto" }}>
            <span><p style={{ fontWeight:"bolder" }}>Tên phòng: {room.roomName}</p></span>
            <span>Hạng : {room?.typeOfRoom}</span>
            <span><NotesIcon style={{ cursor:"pointer" }}/> {room.description}</span>
          </div>
          <div className="price-room-type text-end">
            <p className="amenities d-flex justify-content-center mt-3">
              {room?.roomAmenities && room?.roomAmenities?.length > 0 ? (
                room.roomAmenities.map((ha, index) => (
                  <small
                    className="amenity-item d-flex align-items-center justify-content-center gap-2"
                    key={index}
                  >
                    <Tooltip title={ha.name}>
                      <IconButton>
                        <SvgIcon url={regexUrlIcon(ha.icon)} />
                      </IconButton>
                    </Tooltip>
                  </small>
                ))
              ) : (
                <small>No amenities available</small>
              )}
            </p>
            <span className="content-type ms-3">
              Phòng tối đa {room?.maxSize} người
            </span>
            <span>{convertToVNDDB(room?.price)} / 1 đêm</span>
            <button
              type="button"
              className="book-hotel mb-3"
              onClick={handleBookTicket}

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
