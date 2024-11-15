import { useEffect, useState } from "react";
import "./AccommodationCard.css";
import { HotelService } from "../../../services/apis/HotelService";

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
    loadHotelImages();
  }, [accomodation.hotelId]);

  return (
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
          <ActionButton
            text="Xem chi tiết nơi ở"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/3c4e2726658b7f7d54acceb716f5b91adb3cdef16db10fa02801ded0764b224f?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
            primary={false}
          />
          <ActionButton
            text="Thay đổi nơi ở"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/bab203259e8fa19a412838eaf140ba64e9f7722a017a26c19842b57d89cdb891?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
            primary={true}
          />
        </div>
      </div>
    </article>
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

function ActionButton({ text, primary, icon }) {
  return (
    <button className={`action-button ${primary ? "primary" : "secondary"}`}>
      {text}
      <img src={icon} alt="Action icon" className="action-icon" />
    </button>
  );
}

export default AccommodationCard;
