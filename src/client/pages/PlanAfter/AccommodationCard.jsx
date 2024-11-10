import "./AccommodationCard.css";

function AccommodationCard({
  className,
  onClick,
  name,
  room,
  checkin,
  checkout,
  roomtype,
}) {
  return (
    <article className={`accommodation-card ${className}`} onClick={onClick}>
      <div className="image-gallery">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/123da57d529830a1b364e51ef52ec5042745a8993200541eebb9c40a62954b20?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
          alt="Accommodation view 1"
          className="gallery-image"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/37694338de2e0fadd4645f1bd407db4bf37d504e6099b95a4754955851a9ef26?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
          alt="Accommodation view 2"
          className="gallery-image1"
        />
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/feddeeaa032abccd457849a982a1ca9cf32b40b8d691e4d2856dc52a439ca399?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
          alt="Accommodation view 3"
          className="gallery-image2 full-width"
        />
      </div>
      <div className="accommodation-details">
        <div className="details-header">
          <div className="accommodation-info">
            <h3 className="accommodation-name">{name}</h3>
            <p className="room-type">
              {room} - {roomtype}
            </p>
            <CheckInOut checkIn={checkin} checkOut={checkout} />
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
        <span className="check-label">Check-in</span>
        <span className="check-date">{checkIn} · 14:00 - 00:00</span>
        {/* <span className="check-time">14:00 - 00:00</span> */}
      </div>
      <div className="check-item">
        <span className="check-label">Check-out</span>
        <span className="check-date">{checkOut} · until 12:00</span>
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
