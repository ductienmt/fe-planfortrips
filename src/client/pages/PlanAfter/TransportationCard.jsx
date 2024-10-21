import "./TransportationCard.css";
import "feather-icons/dist/feather";
function TransportationCard({
  className,
  onClick,
  img,
  nameVehicle,
  departureTime,
  arrivalTime,
}) {
  return (
    <article className={`transportation-card ${className}`} onClick={onClick}>
      <img src={img} alt="Transportation image" className="transport-image" />
      <div className="transport-details">
        <div className="transport-header">
          <div className="company-info">
            <img
              src="https://th.bing.com/th/id/OIP.mbhwZiG8FDeZiqvqdFVwSQHaHa?rs=1&pid=ImgDetMain"
              alt="Logo"
              className="logo"
            />

            <div className="company-name">
              <span className="name">{nameVehicle}</span>
              <span className="code">A01</span>
            </div>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d3c33d736aad4abccd8a47609cc0bf5d6d61ec0ca67ffba42062bcd29757826?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
            alt="Company logo"
            className="company-logo"
          />
        </div>
        <div className="journey-info">
          <div className="time-info">
            <TimeDisplay time={departureTime} date="T4, 26 thg 9" />
            <span className="duration">1h 10m</span>
            <TimeDisplay time={arrivalTime} date="T4, 26 thg 9" />
          </div>
          <div className="location-info">
            <LocationDisplay
              place="Xuất phát"
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/385a865a60db67b2221563c86645d1ba2bb924639ea59ef346b2b709c6b210d2?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
              city="Hồ Chí Minh"
              station="Bến xe Miền Đông Mới"
              extraInfo="Đón tại Bến"
            />
            <div className="route-icons">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c5ef82b883104a091b64fc1dad3cdbac04bc4adbcccc77e41af236f5f85d0f8c?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
                alt="Route start"
                className="route-icon"
              />
              {/* <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f2cda72d26f1c67915563e9cacfcc3716d8d5d11d87c08952c0484a418a3102?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6" alt="Route end" className="route-icon" /> */}
            </div>
            <LocationDisplay
              place="Đích đến"
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/2f2cda72d26f1c67915563e9cacfcc3716d8d5d11d87c08952c0484a418a3102?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
              city="Vũng Tàu"
              station="Bến xe Vũng Tàu"
              extraInfo="Trả tại quốc lộ 1A - Bãi tắm sau"
            />
          </div>
        </div>
        <div className="action-buttons">
          <ActionButton
            text="Xem chi tiết vé xe"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/dbe76a40ae0b7e303ecfbe555c65cdd139ed5d62325ec1d0cea56a148c00e491?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
            primary={false}
          />
          <ActionButton
            text="Thay đổi vé xe"
            icon="https://cdn.builder.io/api/v1/image/assets/TEMP/519ca0d46278740a36cdad066470a1e4f02e8e261be1f5cf501031510270da48?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
            primary={true}
          />
        </div>
      </div>
    </article>
  );
}

function TimeDisplay({ time, date }) {
  return (
    <div className="time-display">
      <span className="time">{time}</span>
      <span className="date">{date}</span>
    </div>
  );
}

function LocationDisplay({ place, icon, city, station, extraInfo }) {
  return (
    <div className="location-display">
      <img src={icon} alt="Location icon" className="location-icon" />
      <div className="location-text">
        <span className="place">{place}</span>
        <span className="station">
          {city} · {station}
        </span>
        {extraInfo && <span className="extra-info">{extraInfo}</span>}
      </div>
    </div>
  );
}

function ActionButton({ text, icon, primary }) {
  return (
    <button className={`action-button ${primary ? "primary" : "secondary"}`}>
      {text}
      <img src={icon} alt="Action icon" className="action-icon" />
    </button>
  );
}

export default TransportationCard;
