import { useEffect, useState } from "react";
import { ScheduleService } from "../../../services/apis/ScheduleService";
import "./TransportationCard.css";
import "feather-icons/dist/feather";

const TransportationCard = ({
  className,
  onClick,
  img,
  nameVehicle,
  departureDate,
  arrivalDate,
  departureTime,
  arrivalTime,
  timeCommunicate,
  seatCode,
  scheduleId,
}) => {
  const [departureStationData, setDepartureStationData] = useState("");
  const [arrivalStationData, setArrivalStationData] = useState("");
  const loadStation = async (id) => {
    try {
      const response = await ScheduleService.getStation(id);
      console.log("station", response.data);

      setDepartureStationData(response.data.data.departureStation);
      setArrivalStationData(response.data.data.arrivalStation);
    } catch (error) {
      console.error("Error fetching accommodation data", error);
    }
  };

  useEffect(() => {
    if (scheduleId) {
      loadStation(scheduleId);
    }
  }, [scheduleId]);
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
              <span className="name" style={{ fontSize: "18px" }}>
                {nameVehicle}
              </span>
              <span className="code" style={{ fontSize: "14px" }}>
                {seatCode}
              </span>
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
            <TimeDisplay time={departureTime} date={departureDate} />
            <span className="duration" style={{ fontSize: "14px" }}>
              {timeCommunicate}
            </span>
            <TimeDisplay time={arrivalTime} date={arrivalDate} />
          </div>
          <div className="location-info">
            <LocationDisplay
              place="Xuất phát"
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/385a865a60db67b2221563c86645d1ba2bb924639ea59ef346b2b709c6b210d2?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
              city="Hồ Chí Minh"
              station={departureStationData}
              extraInfo="Đón tại Bến"
            />
            <div className="route-icons">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c5ef82b883104a091b64fc1dad3cdbac04bc4adbcccc77e41af236f5f85d0f8c?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
                alt="Route start"
                className="route-icon"
              />
            </div>
            <LocationDisplay
              place="Đích đến"
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/2f2cda72d26f1c67915563e9cacfcc3716d8d5d11d87c08952c0484a418a3102?placeholderIfAbsent=true&apiKey=75fde3af215540558ff19397203996a6"
              city="Vũng Tàu"
              station={arrivalStationData}
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
};

const TimeDisplay = ({ time, date }) => {
  return (
    <div className="time-display">
      <span className="time" style={{ fontSize: "20px" }}>
        {time}
      </span>
      <span className="date" style={{ fontSize: "14px" }}>
        {date}
      </span>
    </div>
  );
};

const LocationDisplay = ({ place, icon, city, station, extraInfo }) => {
  return (
    <div className="location-display">
      <img src={icon} alt="Location icon" className="location-icon" />
      <div className="location-text">
        <span className="place">{place}</span>
        <span className="station" style={{ fontSize: "17px" }}>
          {city} · {station}
        </span>
        {extraInfo && (
          <span className="extra-info" style={{ fontSize: "13px" }}>
            {extraInfo}
          </span>
        )}
      </div>
    </div>
  );
};

const ActionButton = ({ text, icon, primary }) => {
  return (
    <button className={`action-button ${primary ? "primary" : "secondary"}`}>
      {text}
      <img src={icon} alt="Action icon" className="action-icon" />
    </button>
  );
};

export default TransportationCard;
