import { useEffect, useState } from "react";
import "./AccommodationCard.css";
import { HotelService } from "../../../services/apis/HotelService";
import nhaxe from "../../../assets/caurong.webp";
import HotelCard from "../Hotel/card/hotelCard";
import { convertToVND } from "../../../utils/FormatMoney";


function AccommodationCard({ className, onClick, accomodation }) {
  const [hotelImage1, setHotelImage1] = useState("");
  const [hotelImage2, setHotelImage2] = useState("");
  const [hotelImage3, setHotelImage3] = useState("");

  const loadHotelImages = async () => {
    try {
      const response = await HotelService.findHotelById(accomodation.hotelId);
      const images = response.images;

      if (images.length > 0) {
        const selectedIndices = new Set();

        while (
          selectedIndices.size < 3 &&
          selectedIndices.size < images.length
        ) {
          const randomIndex = Math.floor(Math.random() * images.length);
          selectedIndices.add(randomIndex);
        }

        const indicesArray = Array.from(selectedIndices);

        setHotelImage1(images[indicesArray[0]]?.url);
        setHotelImage2(images[indicesArray[1]]?.url);
        setHotelImage3(images[indicesArray[2]]?.url);
      }
    } catch (error) {
      console.error("Error fetching hotel images:", error);
    }
  };

  useEffect(() => {
    console.log(accomodation.hotelId);
    console.log(accomodation);

    loadHotelImages();
  }, [accomodation.hotelId]);

  return (
    <>
      <article className={`accommodation-card ${className}`} onClick={onClick}>
        <div className="image-gallery">
          <img
            src={hotelImage1}
            alt="Accommodation view 1"
            className="gallery-image"
            loading="lazy"
          />
          <img
            src={hotelImage2}
            alt="Accommodation view 2"
            className="gallery-image1"
            loading="lazy"
          />
          <img
            src={hotelImage3}
            alt="Accommodation view 3"
            className="gallery-image2 full-width"
            loading="lazy"
          />
        </div>
        <div className="accommodation-details">
          <div className="details-header">
            <div className="accommodation-info">
              <h3 className="accommodation-name" style={{ fontSize: "25px" }}>
                {accomodation.nameHotel}
              </h3>

              {accomodation.rooms?.map((room, index) => (
                <div key={index}>
                  <p className="room-type" style={{ fontSize: "15px" }}>
                    {room.nameRoom} - {room.roomType}
                  </p>
                  <CheckInOut checkIn={room.checkin} checkOut={room.checkout} />
                </div>
              ))}
            </div>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8312b6c1afbf8ba2407ea61d3c83d5228f569367fc22cfce1fef9201d811a2c5?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
              alt="Accommodation logo"
              className="accommodation-logo"
            />
          </div>
          <div className="amenities">
            <span className="amenity">Wifi</span>
            <span className="amenity">Gian bếp</span>
            <span className="amenity">Điều hòa</span>
            <span className="amenity">Sân vườn</span>
          </div>
          <div className="action-buttons">
            {/* Bắt đầu xem chi tiết nơi ở */}
            <button
              className="action-button"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#detailLiveModal"
              // onClick={onNext()}
            >
              Chi tiết nơi ở<i className="fa-solid fa-chevron-right"></i>
            </button>
            {/* Kết thúc xem chi tiết nơi ở */}

            {/* Bắt đầu thay đổi nơi ở */}
            <button
              className="action-button"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#changeLiveModal"
            >
              Thay đổi nơi ở<i className="fa-solid fa-chevron-right"></i>
            </button>
            {/* Kết thúc thay đổi nơi ở */}
          </div>
        </div>
      </article>

      {/* Detail Modal */}
      <div
        className="modal fade"
        id="detailLiveModal"
        tabIndex="-1"
        aria-labelledby="detailLiveLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body detail-ticket-color">
              <div className="d-flex justify-content-lg-between">
                <h5
                  style={{
                    fontSize: "25px",
                    textTransform: "uppercase",
                    color: "black",
                  }}
                  id="detailLiveLabel"
                >
                  {accomodation.nameHotel}
                </h5>

                {/* Sử dụng css của RoomVoucher   */}
                <button
                  className="voucher-close-button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="voucher-close-X"></span>
                  <span className="voucher-close-Y"></span>
                  <div className="voucher-close-close">Close</div>
                </button>
              </div>

              {/* Form chi tiết vé */}
              <div className="ticket-detail">
                {/* Ảnh nhà xe */}
                <div className="ticket-detail-image mt-4">
                  <img src={hotelImage1} />
                </div>

                <h5>Thông tin nơi ở</h5>
                <div className="tripTicket-info mb-3">
                  <div className="tripTicket-item">
                    <p>Phòng:</p>
                    <h6>
                      {accomodation.rooms?.map((room, index) => (
                        <div key={index}>
                          <h6>
                            {room.nameRoom} - {room.roomType}
                          </h6>
                        </div>
                      ))}
                    </h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Địa chỉ:</p>
                    <h6>Vũng Tàu</h6>
                  </div>
                  <div className="tripTicket-item">
                    <p>Liên hệ:</p>
                    <h6>0123 456 789</h6>
                  </div>
                  {accomodation.rooms?.map((room, index) => (
                    <div key={index}>
                      <div className="tripTicket-item">
                        <p>Check-in:</p>
                        <h6>{room.checkin}</h6>
                      </div>
                      <div className="tripTicket-item">
                        <p>Check-out:</p>
                        <h6>{room.checkout}</h6>
                      </div>
                    </div>
                  ))}

                  <div className="tripTicket-item">
                    <p>Tiện ích phòng:</p>
                    <h6>wifi, gian bếp, điều hòa, sân vườn</h6>
                  </div>
                </div>

                {/* Tổng tiền */}
                <div className="totalTicket-container d-flex justify-content-md-between">
                  <h3
                    style={{
                      fontWeight: 450,
                    }}
                  >
                    Tổng tiền:
                  </h3>
                  <div className="totalTicket-amount">
                    <h5
                      style={{
                        fontWeight: "bold",
                        fontSize: "25px",
                        color: "red",
                      }}
                    >
                      {convertToVND(accomodation.total)}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Modal */}
      <div
        className="modal fade"
        id="changeLiveModal"
        tabIndex="-1"
        aria-labelledby="changeLiveLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={{
            width: "1000px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          role="document"
        >
          <div
            className="modal-content"
            style={{
              width: "1000px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              className="modal-body change-ticket-color2"
              style={{
                width: "1000px"
              }}
            >
              <div className="d-flex justify-content-lg-between mb-3">
                <h5
                  style={{
                    fontSize: "25px",
                    textTransform: "uppercase",
                    color: "darkblue",
                  }}
                  id="changeLiveLabel"
                >
                  Thay đổi nơi ở
                </h5>

                <button
                  className="voucher-close-button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="voucher-close-X"></span>
                  <span className="voucher-close-Y"></span>
                  <div className="voucher-close-close">Close</div>
                </button>
              </div>
              <HotelCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CheckInOut({ checkIn, checkOut }) {
  return (
    <div className="check-in-out">
      <div className="check-item">
        <span className="check-label" style={{ fontSize: "15px" }}>
          Check-in
        </span>
        <span className="check-date" style={{ fontSize: "15px" }}>
          {checkIn}
        </span>
        {/* <span className="check-time">14:00 - 00:00</span> */}
      </div>
      <div className="check-item">
        <span className="check-label" style={{ fontSize: "15px" }}>
          Check-out
        </span>
        <span className="check-date" style={{ fontSize: "15px" }}>
          {checkOut}
        </span>
        {/* <span className="check-time">until 12:00</span> */}
      </div>
    </div>
  );
}

export default AccommodationCard;
