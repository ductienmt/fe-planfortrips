import "./detailCard.css";
import RoomCard from "../roomCard/roomCard";
import PersonReview from "../personReview/PersonReview";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { HotelService } from "../../../../services/apis/HotelService";
import Loader from "../../../Components/Loading";
import { Box, IconButton, Modal, Tooltip } from "@mui/material";
import {Image } from "antd";
import SvgIcon from "../card/svgIcon";
import { regexUrlIcon } from "../../../../utils/regex";
import BageCartHotel from "../badgeCartHotel/badgeCartHotel";
import HotelCart from "../hotelCart/hotelCart";
import OpenStreetMapEmbed from "../mapCheckin/mapHotel";
import { FeedbackService } from "../../../../services/apis/FeedbackService";
import ReviewHeader from "../personReview/reviewHeader";
import HotelShareComponent from "../shareHotel/shareHotel";
import HotelImageModal from "../hotelImageModal/hotelImageModal";
import { useAuth } from "../../../../context/AuthContext/AuthProvider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "95%",
    sm: "90%",
    md: "80%",
    lg: "70%",
    xl: "60%",
  },
  maxHeight: {
    xs: "80vh",
    sm: "85vh",
    md: "90vh",
  },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  overflow: "hidden",
};


const DetailCard = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const [rooms, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [openFeedback, setOpenFeedback] = useState(false);
  const [isCopyModal, setIsCopyModal] = useState(false);
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  console.log("CheckIn:", checkIn);
  console.log("CheckOut:", checkOut);
  useEffect(() => {
    const fetch = async () => {
      const dataHotel = await HotelService.findHotelById(id);
      if (dataHotel) {
        setHotel(dataHotel);
        setRoom(dataHotel.rooms);
        const dataFeedback = await FeedbackService.getFeedBackByEnterpriseId(
          dataHotel.enterpriseId
        );
        if (dataFeedback) {
          setFeedbacks(dataFeedback);
        }
        setLoading(false);
      }
    };
    fetch();
  }, [setFeedbacks, setHotel, setRoom]);
  const cartRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setOpenCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const onAddReview = (f) => {
    setFeedbacks([...feedbacks, f]);
    setOpenFeedback(false);
  };
  if (loading) {
    return <Loader />;
  }
  const ratingFeel = (rating)=>{
    if(rating > 4){
      return "Rất tốt";
    }else if(rating > 3){
      return "Tốt";
    }else if(rating > 2){
      return "Tạm được"
    }else{
      return "Không tốt";
    }
  }
  return (
    <>
      {selectedRoom.length > 0 && (
        <span className="badge-cart" onClick={() => setOpenCart(!openCart)}>
          <BageCartHotel count={selectedRoom.length} />
        </span>
      )}
      {openCart && (
        <div ref={cartRef}>
          <HotelCart
            hotel={hotel}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            setLoading={setLoading}
            checkIn={checkIn}
            checkOut={checkOut}
          />
        </div>
      )}
      <div className="conatiner custom-detailCard">
        <div className="flex-container-header">
          <div style={{ flexGrow: 8 }} className="nameHotelDetail">
            <div className="name d-flex">
              <h1>{hotel.name}</h1>
            </div>
            <small className="hotel-adr">
              <i className="fa-solid fa-map-pin me-3"></i>
              {hotel.address}
            </small>
            <div className="feed-back-hotel-detail d-flex align-items-center mt-3">
              <div className="start-feedback-hotel">
                {Array(hotel.rating)
                  .fill(0)
                  .map((_, index) => (
                    <i key={index} className="fa-solid fa-star text-warning" ></i>
                  ))}
              </div>
              <span className="total-customer">
                {feedbacks?.length > 0 ? feedbacks?.length : "Chưa có "} người
                đánh giá
              </span>
            </div>
          </div>
          <div
            style={{ flexGrow: 2, textAlign: "end" }}
            className="priceHotelDetail"
          >
           
            <br />
            <div className="btn-detail-hotel d-flex align-items-center">
              {/* <button style={{ flexGrow: 2 }}>
                <i className="fa-solid fa-heart-circle-plus"></i>
              </button> */}
              <button
                style={{ flexGrow: 2 }}
                onClick={() => setIsCopyModal(!isCopyModal)}
              >
                <i className="fa-solid fa-share-nodes"></i>{" "}
              </button>
              {/* <button style={{ flexGrow: 6 }}>Đặt phòng</button> */}
              <a
                href="#room-availible"
                style={{ flexGrow: 6, textDecoration: "none" }}
              >
                Đặt phòng
              </a>
            </div>
          </div>
        </div>
        <div className="flex-container-body">
          <div className="img-col-1">
            <Image
              src={hotel.images[0]?.url ?? "../src/assets/placeNotFound.webp"}
              alt=""
              className="img1"
            />
          </div>
          <div className="img-col-2">
            <Image
              src={hotel.images[1]?.url ?? "../src/assets/placeNotFound.webp"}
              alt=""
              className="img2"
            />
            <Image
              src={hotel.images[2]?.url ?? "../src/assets/placeNotFound.webp"}
              alt=""
              className="img2"
            />
          </div>
          <div className="img-col-3">
            <Image
              src={hotel.images[3]?.url ?? "../src/assets/placeNotFound.webp"}
              alt=""
              className="img3"
            />
            <Image
              src={hotel.images[4]?.url ?? "../src/assets/placeNotFound.webp"}
              alt=""
              className="img4"
            />
          </div>
        </div>
        {hotel.images.length > 0 && (
          <div className="btn-seeAll-container">
            <button className="btn-seeAll" onClick={handleOpen}>
              Xem tất cả
            </button>
          </div>
        )}
        <HotelImageModal open={open} handleClose={handleClose} hotel={hotel} />
        <hr />
        <div className="row">
          <div className="col-6">
            <h4 className="text-center">Giới thiệu về khách sạn</h4>
            <p>
              {hotel?.description
                ? hotel?.description
                : "Khách sạn không có giới thiệu"}
            </p>
          </div>
          <div className="col-6" id="room-availible">
            <h4 className="amenities-text">Tiện ích</h4>
            <p className="amenities d-flex justify-content-center mt-3">
              {hotel?.hotelAmenities && hotel.hotelAmenities.length > 0 ? (
                hotel.hotelAmenities.map((ha, index) => (
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
          </div>
          <hr />
          <div className="room-availible">
            <h3>Phòng hiện có</h3>
            {rooms.length > 0
              ? rooms.map((r) => (
                  <RoomCard
                    selectedRoom={selectedRoom}
                    setSelectedRoom={setSelectedRoom}
                    key={r.id}
                    room_id={r.id}
                  />
                ))
              : "Hiện tại không có phòng"}
          </div>
        </div>
        <hr className="py-3" />
        <div className="location-hotel">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Vị trí</h3>
            <button className="findHotel-onMap">Xem bản đồ</button>
          </div>
          <div className="map-location mt-5">
            <OpenStreetMapEmbed address={hotel.name} />
          </div>
        </div>
        <hr className="py-3" />
        <div className="review-hotel mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Đánh giá</h3>
            {token ? (
              <button
                className="giveYour-review"
                onClick={() => setOpenFeedback(!openFeedback)}
              >
                Thêm đánh giá của bạn
              </button>
            ) : ("Đăng nhập để đánh giá")}
          </div>
          <div className="star-review">
            <div className="d-flex justify-content-start">
              <span className="star-number">{hotel.rating}</span>
              <div className="status-review">
                <span className="status-text-review">{ratingFeel(hotel.rating)}</span>
                {feedbacks.length > 0 ? (
                  <span>{feedbacks.length} người đã đánh giá</span>
                ) : (
                  "Chưa có lượt đánh giá nào"
                )}
              </div>
            </div>
          </div>
        </div>
        {token && (
          <ReviewHeader
            onAddReview={onAddReview}
            enterpriseId={hotel.enterpriseId}
          />
        )}
        <div className="persons-review">
          {feedbacks.map((f) => (
            <PersonReview key={f.id} feedback={f} />
          ))}
        </div>
      </div>
      <Modal
        open={isCopyModal}
        onClose={() => setIsCopyModal(!isCopyModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <HotelShareComponent hotel={hotel} />
        </Box>
      </Modal>
    </>
  );
};

export default DetailCard;
