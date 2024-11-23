import React from "react";
import "./TripCompo.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const TripCompo = ({ trip }) => {
  const getStatusDisplay = (status) => {
    switch (status) {
      case "NOT_STARTED":
        return { text: "Chưa bắt đầu", bgColor: "status-not-started" };
      case "IN_PROGRESS":
        return { text: "Đang tiến hành", bgColor: "status-in-progress" };
      case "COMPLETE":
        return { text: "Đã hoàn thành", bgColor: "status-completed" };
      default:
        return { text: "Không xác định", bgColor: "status-unknown" };
    }
  };
  const { text, bgColor } = getStatusDisplay(trip.status);
  const convertToVND = (amount) => {
    const formattedAmount = amount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedAmount}VNĐ`;
  };
  return (
    <>
      <div className="tripcompo-container-custom">
        <div className="tripcompo-card">
          <div className="card-left">
            <div
              className="head"
              style={{ display: "flex", gap: "10px", alignItems: "center" }}
            >
              <div className="tripcompo-title" style={{ fontSize: "25px" }}>
                {trip.plan_name}
              </div>
              <div className={`tripcompo-status ${bgColor}`}>{text}</div>
              <div className="tripcompo-number">{trip.numberPeople} người</div>
            </div>
            <div
              className="body"
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <div
                className="body-lefy"
                style={{ borderRight: "1px solid #fff", paddingRight: "20px" }}
              >
                <div className="tripcompo-location">
                  {trip.origin_location}{" "}
                  <ArrowForwardIcon style={{ fontSize: "15px" }} />{" "}
                  {trip.destination}
                </div>
                <div className="tripcompo-date">
                  Từ {trip.start_date} đến {trip.end_date}
                </div>
              </div>
              <div className="body-right" style={{ paddingLeft: "20px" }}>
                <div>Chi phí: {convertToVND(trip.budget)}</div>
                <div>
                  Còn lại: {convertToVND(trip.budget - trip.final_price)}
                </div>
              </div>
            </div>
          </div>
          <div
            className="card-right"
            style={{ display: "flex", alignItems: "center" }}
          >
            <button className="bookmarkBtn">
              <span className="IconContainer">
                <svg viewBox="0 0 384 512" height="0.9em" className="icon">
                  <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                </svg>
              </span>
              <p className="text">Lưu</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripCompo;
