import img1 from "../../../../assets/beach.jpg";
import img3 from "../../../../assets/beach.jpg";
import img5 from "../../../../assets/beach.jpg";
import "./roomCard.css";
import { Link } from "react-router-dom";

const RoomCard = () => {
  return (
    <>
      <div className="flex-container-room-card">
        <div className="card-room-type align-items-center">
          <div className="d-flex align-items-center custom-img-room-type">
            <img style={{ width: "500px", }} src={img1} alt="" />
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
            <span>300.000 VNĐ / 1 đêm</span>
            <Link to="/hotel/booking">Đặt ngay</Link>
          </div>
        </div>
        <div className="card-room-type align-items-center">
          <div className="d-flex align-items-center custom-img-room-type">
            <img style={{ width: "" }} src={img5} alt="" className="" />
            <p className="content-type ms-3">
              Phòng gia đình (2 người lớn, 2 bé nhỏ)
            </p>
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
            <span>400.000 VNĐ / 1 đêm</span>
            <Link to={"./booking"}>Đặt ngay</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
