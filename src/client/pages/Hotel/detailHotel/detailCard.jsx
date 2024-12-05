import "./detailCard.css";
import img1 from "../../../../assets/beach.jpg";
import img2 from "../../../../assets/beach.jpg";
import img3 from "../../../../assets/beach.jpg";
import img4 from "../../../../assets/beach.jpg";
import img5 from "../../../../assets/beach.jpg";
import RoomCard from "../roomCard/roomCard";
import PersonReview from "../personReview/PersonReview";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HotelService } from "../../../../services/apis/HotelService";
import Loader from "../../../Components/Loading";

const DetailCard = () => {
  const originalPrice = 250000;
  const discountedPrice = 200000;
  const hasDiscount = discountedPrice < originalPrice;
  window.scrollTo(0, 0);
  const [loading,setLoading] = useState(true);
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const [rooms,setRoom] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const dataHotel = await HotelService.findHotelById(id);
      if (dataHotel) {
        setHotel(dataHotel);
        setRoom(dataHotel.rooms);
        setLoading(false);
      }
    };
    fetch();
  }, [hotel]);

  useEffect(() => {
    console.log("DetailCard id", id);
  }, [id]);
 if(loading){
  return <Loader />
 }
  return (
    <>
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
              <span className="total-customer">43 người đánh giá</span>
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
              <button style={{ flexGrow: 2 }}>
                <i className="fa-solid fa-heart-circle-plus"></i>
              </button>
              <button style={{ flexGrow: 2 }}>
                <i className="fa-solid fa-share-nodes"></i>{" "}
              </button>
              {/* <button style={{ flexGrow: 6 }}>Đặt phòng</button> */}
              <a href="#room-availible" style={{ flexGrow: 6 }}>
                Đặt phòng
              </a>
            </div>
          </div>
        </div>
        <div className="flex-container-body">
          <div className="img-col-1">
            <img src={img1} alt="" className="img1" />
          </div>
          <div className="img-col-2">
            <img src={img2} alt="" className="img2" />
            <img src={img3} alt="" className="img2" />
          </div>
          <div className="img-col-3">
            <img src={img4} alt="" className="img3" />
            <img src={img5} alt="" className="img4" />
          </div>
        </div>
        <div className="btn-seeAll-container">
          <button className="btn-seeAll">Xem tất cả</button>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">
            <h4 className="text-center">Giới thiệu về khách sạn</h4>
            <p>
              {hotel.description}
            </p>
          </div>
          <div className="col-6" id="room-availible">
            <h4 className="amenities-text">Tiện ích</h4>
            <p className="amenities d-flex justify-content-center mt-3">
              <small>
                <i className="fa-solid fa-square-parking"></i>Bãi đỗ xe
              </small>
              <small>
                <i className="fa-solid fa-wifi"></i>Wifi
              </small>
              <small>
                <i className="fa-solid fa-person-swimming"></i>Hồ bơi
              </small>
            </p>
          </div>
          <hr />
          <div className="room-availible">
            <h3>Phòng hiện có</h3>
            {rooms.length > 0 ? 
              rooms.map((r) => (
                <RoomCard 
                  key={r.id} 
                  img={r.images[0]?.url} 
                  roomSize={r?.maxSize} 
                  priceOneNight={r?.price} 
                  onBook={r?.is_available}
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
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5542.8534894200375!2d106.69779536075971!3d10.78146699982767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f37e6d82451%3A0xe84f59936ced5b45!2zTmjDoCB0aOG7nSDEkOG7qWMgQsOgIFPDoGkgR8Oybg!5e0!3m2!1svi!2s!4v1720430395747!5m2!1svi!2s"
              style={{
                width: "100%",
                height: "600px",
                border: 0,
                borderRadius: "13px",
              }}
              allowfullscreen=""
              loading="lazy"
              // referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <hr className="py-3" />
        <div className="review-hotel mb-3">
          <div className="d-flex justify-content-between align-items-center">
            <h3>Đánh giá</h3>
            <button className="giveYour-review">Thêm đánh giá của bạn</button>
          </div>
          <div className="star-review">
            <div className="d-flex justify-content-start">
              <span className="star-number">4.9</span>
              <div className="status-review">
                <span className="status-text-review">Rất tốt</span>
                <span>43 người đã đánh giá</span>
              </div>
            </div>
          </div>
        </div>
        <div className="persons-review">
          <PersonReview />
          <PersonReview />
          <PersonReview />
          <PersonReview />
        </div>
      </div>
    </>
  );
};

export default DetailCard;
