import "./Transportation.css";
import { format, getDay } from "date-fns";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";

const Transportation = ({
  name,
  type,
  seat,
  numberSeat,
  departureLocation,
  arrivalLocation,
  departureTime,
  arrivalTime,
  departureDate,
  arrivalDate,
  departureStation,
  arrivalStation,
  pickupLocation,
  dropoffLocation,
}) => {
  const formatDate = (dateString) => {
    const parsedDate = new Date(dateString);
    const dayOfWeek = getDay(parsedDate);

    const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

    return `${daysOfWeek[dayOfWeek]}, ${format(parsedDate, "dd-MM-yyyy")}`;
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    const [departureHours, departureMinutes] = departureTime
      .split(":")
      .map(Number);
    const [arrivalHours, arrivalMinutes] = arrivalTime.split(":").map(Number);

    const departureDate = new Date();
    const arrivalDate = new Date();

    departureDate.setHours(departureHours, departureMinutes);
    arrivalDate.setHours(arrivalHours, arrivalMinutes);

    let diffInMs = arrivalDate.getTime() - departureDate.getTime();

    if (diffInMs < 0) {
      diffInMs += 24 * 60 * 60 * 1000;
    }

    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="transportation-container">
        <div className="infomation-card">
          <h4
            className="text-white"
            style={{ fontSize: "18px", margin: "auto 0" }}
          >
            Thông tin phương tiện
          </h4>
        </div>
        <div style={{ padding: "10px 20px" }}>
          <div className="transportation-header">
            <div className="nameVehicle">
              <h2 style={{ fontWeight: "700" }}>{name}</h2>
              <p>{type}</p>
            </div>
            <div
              className="seat"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p>
                Số ghế đã đặt: {numberSeat} (Mã: {seat})
              </p>
              <button className="icon btn" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </button>
            </div>
          </div>
          <div className={`${isOpen ? "d-block" : "d-none"}`}>
            <div className={`transportation-body`}>
              <div className="departure">
                <p style={{ fontSize: "20px" }}>{departureLocation}</p>
                <p className="departure-time">Khởi hành</p>
                <p style={{ fontWeight: "600" }}>{departureTime}</p>
                <p style={{ fontSize: "18px" }}>{formatDate(departureDate)}</p>
              </div>
              <div className="line">
                <ArrowRightAltIcon />
              </div>
              <div className="arrival">
                <p style={{ fontSize: "20px" }}>{arrivalLocation}</p>
                <p className="arrival-time">Đến nơi</p>
                <p style={{ fontWeight: "600" }}>{arrivalTime}</p>
                <p style={{ fontSize: "18px" }}>{formatDate(arrivalDate)}</p>
              </div>
            </div>
            <div className={`transportation-footer`}>
              <div className="footer-on">
                <div className="icon">
                  <TripOriginIcon />
                </div>
                <div className="infomation">
                  <p className="pickup">Điểm đón</p>
                  <p style={{ fontSize: "20px", fontWeight: "600" }}>
                    {departureStation}
                  </p>
                  <p style={{ fontSize: "18px" }}>{pickupLocation}</p>
                </div>
              </div>
              <div
                className="line"
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "18%",
                  flexDirection: "column",
                  marginBottom: "10px",
                }}
              >
                <span>|</span>
                <span>{calculateDuration(departureTime, arrivalTime)}</span>
                <span>|</span>
              </div>
              <div className="footer-behind">
                <div className="icon">
                  <ShareLocationIcon />
                </div>
                <div className="infomation">
                  <p className="dropoff">Điểm trả</p>
                  <p style={{ fontSize: "20px", fontWeight: "600" }}>
                    {arrivalStation}
                  </p>
                  <p style={{ fontSize: "18px" }}>{dropoffLocation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Transportation;
