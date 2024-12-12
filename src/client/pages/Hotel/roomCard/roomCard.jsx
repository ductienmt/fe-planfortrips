import "./roomCard.css";
import { Snackbar, Alert, Tooltip, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { RoomService } from "../../../../services/apis/RoomService";
import SvgIcon from "../card/svgIcon";
import { regexUrlIcon } from "../../../../utils/regex";
import { Image } from "antd";
import NotesIcon from "@mui/icons-material/Notes";
import { enqueueSnackbar } from "notistack";
import { useAuth } from "../../../../context/AuthContext/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
const RoomCard = ({ room_id, setSelectedRoom, selectedRoom }) => {
  const [room, setRoom] = useState({});
  const {token} = useAuth();
  const navigate = useNavigate();
  const handleBookTicket = (e) => {
    e.preventDefault(); 
    const isRoomAlreadySelected = selectedRoom.find(
      (selected) => selected.id === room.id
    );
    if (!isRoomAlreadySelected) {
      setSelectedRoom([...selectedRoom, room]);
      enqueueSnackbar("Đã thêm vào giỏ hàng",{variant:"success",autoHideDuration:3000});
    }else{
      enqueueSnackbar("Phòng này đã có trong giỏ hàng",{variant:"error",autoHideDuration:3000});
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await RoomService.findRoomById(room_id);
      if (response) {
        setRoom(response);
        console.log(response);
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
                  : "../src/assets/imageRoomNotExist.jpg"
              }
              alt="Room Image"
            />
          </div>
          <div className="bg-room-description" style={{ height: "auto" }}>
            <span>
              <p style={{ fontWeight: "bolder" }}>Tên phòng: {room.roomName}</p>
            </span>
            <span>Hạng : {room?.typeOfRoom}</span>
            <span>
              <NotesIcon style={{ cursor: "pointer" }} /> {room.description}
            </span>
          </div>
          <div className="detail-price">
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
                  <small style={{ width:"100%",textAlign:"center" }}>Tiện ích chưa được bổ sung</small>
                )}
              </p>
              <span className="content-type ms-3">
                Phòng tối đa {room?.maxSize} người
              </span>
              <span>{convertToVNDDB(room?.price)} / 1 đêm</span>
              {token ? (<button
                type="button"
                className="book-hotel mb-3 text-center"
                onClick={(e)=>handleBookTicket(e)}
              >
                Đặt ngay
              </button>): (<button type="button"
                className="book-hotel mb-3 text-center" onClick={()=> navigate("/login")}>Đăng nhập để đặt phòng</button>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
