import "./detailCard.css";
import RoomCard from "../roomCard/roomCard";
import PersonReview from "../personReview/PersonReview";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { HotelService } from "../../../../services/apis/HotelService";
import Loader from "../../../Components/Loading";
import { Box, IconButton, Modal, Tooltip, Typography } from "@mui/material";
import { Carousel, Image } from "antd";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SvgIcon from "../card/svgIcon";
import { regexUrlIcon } from "../../../../utils/regex";
import BageCartHotel from "../badgeCartHotel/badgeCartHotel";
import HotelCart from "../hotelCart/hotelCart";
import OpenStreetMapEmbed from "../mapCheckin/mapHotel";
import { FeedbackService } from "../../../../services/apis/FeedbackService";
import ReviewHeader from "../personReview/reviewHeader";
import { enqueueSnackbar } from "notistack";

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

const contentStyle = {
  height: "500px",
  maxHeight: {
    xs: "70vh",
    sm: "75vh",
    md: "80vh",
  },
  objectFit: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
};
const DetailCard = () => {
  const { hotel_id } = useParams();
  const [hotelDetails, setHotelDetails] = useState(null);

  const fetchHotelDetails = async () => {
    try {
      const data = await HotelService.findHotelById(hotel_id);
      setHotelDetails(data);
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    }
  };

  useEffect(() => {
    console.log(hotel_id);

    fetchHotelDetails();
  }, [hotel_id]);

  if (!hotelDetails) {
    return <div>Loading...</div>;
  }

  const originalPrice = 250000;
  const discountedPrice = 200000;
  const hasDiscount = discountedPrice < originalPrice;
  window.scrollTo(0, 0);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const [rooms, setRoom] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [openFeedback, setOpenFeedback] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const dataHotel = await HotelService.findHotelById(id);
      if (dataHotel) {
        setHotel(dataHotel);
        setRoom(dataHotel.rooms);
        setLoading(false);
        console.log(hotel);
        const dataFeedback = await FeedbackService.getFeedBackByEnterpriseId(
          dataHotel.enterpriseId
        );
        if (dataFeedback) {
          setFeedbacks(dataFeedback);
          console.log(feedbacks);
        }
      }
    };
    fetch();
  }, [setFeedbacks, setHotel, setRoom]);
  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        enqueueSnackbar("Link đã được sao chép", {
          variant: "success",
          autoHideDuration: 2000,
        });
      })
      .catch((err) => {
        console.error("Không thể sao chép link:", err);
      });
  };
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
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
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
            <div className="feed-back-hotel d-flex align-items-center mt-3">
              <div className="start-feedback">
                {Array(hotel.rating)
                  .fill(0)
                  .map((_, index) => (
                    <i key={index} className="fa-solid fa-star"></i>
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
            <span className={`price ${hasDiscount ? "discounted" : ""}`}>
              {originalPrice.toLocaleString("vi-VN")} VNĐ
            </span>
            <br />
            {hasDiscount && (
              <span className="new-price">
                {discountedPrice.toLocaleString("vi-VN")} VNĐ
              </span>
            )}
            <br />
            <div className="btn-detail-hotel d-flex align-items-center">
              {/* <button style={{ flexGrow: 2 }}>
                <i className="fa-solid fa-heart-circle-plus"></i>
              </button> */}
              <button style={{ flexGrow: 2 }} onClick={handleCopyLink}>
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
              src={hotel.images[0].url ?? "src/assets/placeNotFound.webp"}
              alt=""
              style={{ height: "500px" }}
              className="img11"
            />
          </div>
          <div className="img-col-2">
            <Image
              src={hotel.images[1].url ?? "src/assets/placeNotFound.webp"}
              alt=""
              className="img2"
            />
            <Image
              src={hotel.images[2].url ?? "src/assets/placeNotFound.webp"}
              alt=""
              className="img2"
            />
          </div>
          <div className="img-col-3">
            <Image
              src={hotel.images[3].url ?? "src/assets/placeNotFound.webp"}
              alt=""
              className="img3"
            />
            <Image
              src={hotel.images[4].url ?? "src/assets/placeNotFound.webp"}
              alt=""
              className="img4"
            />
          </div>
        </div>
        <div className="btn-seeAll-container">
          <button className="btn-seeAll" onClick={handleOpen}>
            Xem tất cả
          </button>
        </div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style }}>
            <Carousel
              arrows
              infinite={false}
              prevArrow={
                <div
                  style={{
                    position: "absolute",
                    left: 10,
                    zIndex: 2,
                    width: 50,
                    height: 50,
                    background: "rgba(0,0,0,0.5)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                  }}
                >
                  <ArrowBackIosNewIcon
                    style={{
                      color: "black",
                      fontSize: 30,
                    }}
                  />
                </div>
              }
              nextArrow={
                <div
                  style={{
                    position: "absolute",
                    right: 10,
                    zIndex: 2,
                    width: 50,
                    height: 50,
                    background: "rgba(0,0,0,0.5)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#000",
                  }}
                >
                  <ArrowForwardIosIcon
                    style={{
                      color: "black",
                      fontSize: 30,
                    }}
                  />
                </div>
              }
            >
              {hotel.images.map((i, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "500px",
                    height: "400px",
                    margin: "0 auto",
                  }}
                >
                  <Image
                    style={{
                      ...contentStyle,
                      width: "90%",
                    }}
                    src={i.url}
                    alt={`Hotel image ${index + 1}`}
                  />
                </div>
              ))}
            </Carousel>
            <br />
          </Box>
        </Modal>
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
            <button
              className="giveYour-review"
              onClick={() => setOpenFeedback(!openFeedback)}
            >
              Thêm đánh giá của bạn
            </button>
          </div>
          <div className="star-review">
            <div className="d-flex justify-content-start">
              <span className="star-number">{hotel.rating}</span>
              <div className="status-review">
                <span className="status-text-review">Rất tốt</span>
                {feedbacks.length > 0 ? (
                  <span>{feedbacks.length} người đã đánh giá</span>
                ) : (
                  "Chưa có lượt đánh giá nào"
                )}
              </div>
            </div>
          </div>
        </div>
        {openFeedback && (
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
    </>
  );
};

export default DetailCard;
