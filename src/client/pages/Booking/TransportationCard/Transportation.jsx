import "./Transportation.css";
import { parse, format as formatDateFns, isValid, getDay } from "date-fns";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import Loader from "../../../Components/Loading";

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
  scheduleId,
  routeId,
  loadStation,
  stationData,
  loadCities,
  cityData,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) {
      return "Không xác định";
    }

    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());

    if (!isValid(parsedDate)) {
      return "Ngày không hợp lệ";
    }

    const daysOfWeek = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const dayOfWeek = getDay(parsedDate);

    return `${daysOfWeek[dayOfWeek]}, ${formatDateFns(parsedDate, "dd-MM-yyyy")}`;
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
  const [isLoading, setIsLoading] = useState(false);

  const toggleStation = async () => {
    if (
      !isOpen &&
      !stationData.departureStation &&
      !stationData.arrivalStation &&
      !cityData.originalCity &&
      !cityData.destination
    ) {
      setIsLoading(true);
      await loadStation(scheduleId);
      await loadCities(routeId);
      setIsLoading(false);
    }
    setIsOpen(!isOpen);
  };

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
              <button className="icon btn" onClick={() => toggleStation()}>
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </button>
            </div>
          </div>
          {isLoading ? (
            <Loader rong={"10vh"} />
          ) : (
            <div className={`${isOpen ? "d-block" : "d-none"}`}>
              <div className={`transportation-body`}>
                <div className="departure">
                  <p style={{ fontSize: "20px" }}>{cityData.originalCity}</p>
                  <p className="departure-time">Khởi hành</p>
                  <p style={{ fontWeight: "600" }}>{departureTime}</p>
                  <p style={{ fontSize: "18px" }}>
                    {formatDate(departureDate)}
                  </p>
                </div>
                <div className="line">
                  <ArrowRightAltIcon />
                </div>
                <div className="arrival">
                  <p style={{ fontSize: "20px" }}>{cityData.destination}</p>
                  <p className="arrival-time">Đến nơi</p>
                  <p style={{ fontWeight: "600" }}>{arrivalTime}</p>
                  <p style={{ fontSize: "18px" }}>{formatDate(arrivalDate)}</p>
                </div>
              </div>
              <div className={`transportation-footer`}>
                <div className="footer-on">
                  <div className="icon" style={{ alignItems: "center" }}>
                    <TripOriginIcon />
                  </div>
                  <div className="infomation">
                    <p className="pickup">Điểm đón</p>
                    <p style={{ fontSize: "20px", fontWeight: "600" }}>
                      {stationData.departureStation}
                    </p>
                    <p style={{ fontSize: "18px" }}>
                      {stationData.departureStation}
                    </p>
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
                      {stationData.arrivalStation}
                    </p>
                    <p style={{ fontSize: "18px" }}>
                      {stationData.arrivalStation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Transportation;
